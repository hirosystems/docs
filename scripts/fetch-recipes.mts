#!/usr/bin/env node

/**
 * Script to fetch code-block recipe files from a separate GitHub repo
 * and store them locally under .cache/recipes for doc usage at build time.
 */

import fs from "fs/promises";
import path from "path";
import https from "https";

// Configuration
const REPO_OWNER = "hirosystems";
const REPO_NAME = "recipes";
const BRANCH = "main";
const BASE_PATH = "recipes/";
const DEST_FOLDER = ".cache/recipes";

async function getGitHubFileList() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${BASE_PATH}?ref=${BRANCH}`;
  const response = await fetchUrl(url);
  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Failed to parse GitHub API response:");
    console.error("Response:", response);
    throw new Error(`Invalid JSON response from GitHub API: ${error.message}`);
  }
}

async function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const handleResponse = (res: any) => {
      if (
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        https
          .get(
            res.headers.location,
            {
              headers: {
                "User-Agent": "hirosystems/fetch-recipes",
                Accept: "application/vnd.github.v3+json",
              },
            },
            handleResponse
          )
          .on("error", reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`GitHub API returned status ${res.statusCode}`));
        return;
      }

      let data = "";
      res.on("data", (chunk: string) => (data += chunk));
      res.on("end", () => resolve(data));
    };

    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "hirosystems/fetch-recipes",
          Accept: "application/vnd.github.v3+json",
        },
      },
      handleResponse
    );

    req.on("error", (err) => reject(err));
    req.end();
  });
}

async function main() {
  try {
    await fs.mkdir(DEST_FOLDER, { recursive: true });

    const fileList = await getGitHubFileList();

    if (!Array.isArray(fileList)) {
      throw new Error("GitHub API did not return an array of files");
    }

    const mdxFiles = fileList.filter((f) => f.name.endsWith(".mdx"));

    for (const file of mdxFiles) {
      const fileContent = await fetchUrl(file.download_url);
      const filename = path.join(DEST_FOLDER, file.name);
      await fs.writeFile(filename, fileContent, "utf8");
    }

    console.log("All recipe code blocks fetched successfully.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();

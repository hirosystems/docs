import {
  printErrors,
  readFiles,
  scanURLs,
  validateFiles,
} from "next-validate-link";
import { getSlugs, parseFilePath } from "fumadocs-core/source";
import { getTableOfContents } from "fumadocs-core/server";
import path from "node:path";
import fs from "node:fs";

async function checkLinks() {
  const docsFiles = await readFiles("content/docs/**/*.{md,mdx}");

  const scanned = await scanURLs({
    populate: {
      // "(home)/blog/[slug]": blogFiles.map((file) => {
      //   const info = parseFilePath(path.relative("content/blog", file.path));

      //   return {
      //     value: getSlugs(info)[0],
      //     hashes: getTableOfContents(file.content).map((item) =>
      //       item.url.slice(1)
      //     ),
      //   };
      // }),
      "(docs)/[...slug]": docsFiles.map((file) => {
        const info = parseFilePath(path.relative("content/docs", file.path));

        return {
          value: getSlugs(info),
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1)
          ),
        };
      }),
    },
  });

  printErrors(
    await validateFiles([...docsFiles], {
      scanned,
      whitelist: (url) => {
        // Existing whitelist conditions
        if (url.startsWith("#!") || url === "tooltip") {
          return true;
        }

        // Check if it's an llms.txt route
        if (url.endsWith("/llms.txt")) {
          const publicPath = path.join(process.cwd(), "public", url);

          if (fs.existsSync(publicPath)) {
            return true;
          }
          console.warn(`Warning: llms.txt file not found at ${publicPath}`);
          return false;
        }

        return false;
      },
    }),
    true
  );
}

void checkLinks();

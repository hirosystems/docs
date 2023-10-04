/**
 * This utility pulls the latest Hiro OpenAPI definitions from Vercel and saves them into the
 * `openapi/` directory so Docusaurus can use them to build the docs website.
 */

import https from 'https';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const directory = './openapi';
const asyncPipeline = promisify(pipeline);

async function downloadOpenApiJson(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = https.get(`https://${url}.vercel.app/openapi.json`, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}'. Status Code: ${res.statusCode}`));
        return;
      }
      asyncPipeline(res, fs.createWriteStream(`${directory}/${url}.json`))
        .then(resolve)
        .catch(reject);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}

if (!fs.existsSync(directory)) fs.mkdirSync(directory);
Promise.all([
  downloadOpenApiJson('ordinals-api'),
  downloadOpenApiJson('token-metadata-api'),
  downloadOpenApiJson('stacks-blockchain-api'),
]).catch(err => console.error(err));

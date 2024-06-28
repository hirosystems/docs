const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const baseDir = path.join(__dirname, '../content/docs');

const categories = {
  stacks: [],
  ordinals: [],
  guides: []
};

const stacksSubDirs = [
  'api', 'archive', 'chainhook', 'clarinet', 'clarinet-js-sdk', 'connect', 
  'explorer', 'nakamoto', 'platform', 'stacks.js', 'token-metadata-api'
];

const ordinalsSubDirs = ['api', 'explorer', 'ordhook'];

function categorizeFiles(dir, category, subDirs = []) {
  if (subDirs.length > 0) {
    subDirs.forEach(subDir => {
      const guidesDir = path.join(dir, subDir, 'guides');
      if (fs.existsSync(guidesDir)) {
        collectMarkdownFiles(guidesDir, category, subDir);
      }
    });
  } else {
    collectMarkdownFiles(dir, category);
  }
}

function collectMarkdownFiles(dir, category, subDir = '') {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      collectMarkdownFiles(filePath, category, subDir);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      categories[category].push({
        title: data.title || toReadableTitle(path.basename(file, path.extname(file))),
        href: filePath.replace(baseDir, '').replace(/\\/g, '/').replace(path.extname(filePath), ''),
        description: data.description || '',
        category: subDir
      });
    }
  });
}

function toReadableTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

categorizeFiles(path.join(baseDir, 'stacks'), 'stacks', stacksSubDirs);
categorizeFiles(path.join(baseDir, 'ordinals'), 'ordinals', ordinalsSubDirs);
categorizeFiles(baseDir, 'guides');

fs.writeFileSync(path.join(__dirname, '../utils/all-guides.json'), JSON.stringify(categories, null, 2));
console.log('Guides data generated successfully.');
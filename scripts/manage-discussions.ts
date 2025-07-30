#!/usr/bin/env bun
import { App } from '@octokit/app';

// Initialize GitHub App
const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
});

const [owner, repo] = process.env.GITHUB_REPOSITORY!.split('/');

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];
const filter = args[1];

async function listDiscussions(filterText?: string) {
  const octokit = await app.getInstallationOctokit(
    parseInt(process.env.GITHUB_APP_INSTALLATION_ID!),
  );

  const { repository } = await octokit.graphql<{
    repository: {
      discussions: {
        nodes: Array<{
          id: string;
          number: number;
          title: string;
          url: string;
          createdAt: string;
          comments: {
            totalCount: number;
          };
        }>;
      };
    };
  }>(
    `
    query GetDiscussions($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        discussions(first: 100, categoryId: "${process.env.GITHUB_DISCUSSION_CATEGORY_ID}", orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            id
            number
            title
            url
            createdAt
            comments {
              totalCount
            }
          }
        }
      }
    }
  `,
    { owner, repo },
  );

  let discussions = repository.discussions.nodes;

  if (filterText) {
    discussions = discussions.filter((d) =>
      d.title.toLowerCase().includes(filterText.toLowerCase()),
    );
  }

  console.log(
    `\nFound ${discussions.length} discussions${filterText ? ` matching "${filterText}"` : ''}:\n`,
  );

  discussions.forEach((d) => {
    console.log(`#${d.number}: ${d.title}`);
    console.log(`  URL: ${d.url}`);
    console.log(`  Created: ${new Date(d.createdAt).toLocaleDateString()}`);
    console.log(`  Comments: ${d.comments.totalCount}`);
    console.log('');
  });

  return discussions;
}

async function deleteDiscussions(filterText: string) {
  if (!filterText) {
    console.error('Please provide a filter text for safety');
    process.exit(1);
  }

  const discussions = await listDiscussions(filterText);

  if (discussions.length === 0) {
    console.log('No discussions to delete');
    return;
  }

  console.log(`\n⚠️  About to delete ${discussions.length} discussions!`);
  console.log('Press Enter to continue or Ctrl+C to cancel...');

  await new Promise((resolve) => {
    process.stdin.once('data', resolve);
  });

  const octokit = await app.getInstallationOctokit(
    parseInt(process.env.GITHUB_APP_INSTALLATION_ID!),
  );

  for (const discussion of discussions) {
    try {
      await octokit.graphql(
        `
        mutation DeleteDiscussion($discussionId: ID!) {
          deleteDiscussion(input: { id: $discussionId }) {
            clientMutationId
          }
        }
      `,
        {
          discussionId: discussion.id,
        },
      );

      console.log(`✅ Deleted: ${discussion.title}`);
    } catch (error) {
      console.error(
        `❌ Failed to delete ${discussion.title}:`,
        error instanceof Error ? error.message : error,
      );
    }
  }
}

// Main command handler
async function main() {
  switch (command) {
    case 'list':
      await listDiscussions(filter);
      break;

    case 'delete':
      await deleteDiscussions(filter);
      break;

    default:
      console.log(`
GitHub Discussions Manager

Usage:
  bun run scripts/manage-discussions.ts <command> [filter]

Commands:
  list [filter]    List all discussions (optionally filtered by text)
  delete <filter>  Delete discussions matching the filter text

Examples:
  bun run scripts/manage-discussions.ts list
  bun run scripts/manage-discussions.ts list "test"
  bun run scripts/manage-discussions.ts delete "test"
`);
  }
}

main().catch(console.error);

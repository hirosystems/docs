import { App } from '@octokit/app';
import { graphql } from '@octokit/graphql';

// Decode base64 private key for Vercel deployment
const privateKey = Buffer.from(process.env.GITHUB_APP_PRIVATE_KEY!, 'base64').toString('utf-8');

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: privateKey,
});

async function getGraphQLClient() {
  const octokit = await app.getInstallationOctokit(
    parseInt(process.env.GITHUB_APP_INSTALLATION_ID!),
  );
  return octokit.graphql;
}

export interface Discussion {
  id: string;
  number: number;
  title: string;
  url: string;
  body: string;
  createdAt: string;
  comments: {
    totalCount: number;
  };
}

export async function findDiscussionByTitle(title: string): Promise<Discussion | null> {
  const graphqlClient = await getGraphQLClient();
  const [owner, repo] = process.env.GITHUB_REPOSITORY!.split('/');

  try {
    const response = await graphqlClient<{
      repository: {
        discussions: {
          nodes: Discussion[];
        };
      };
    }>(
      `
      query FindDiscussion($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          discussions(first: 10, categoryId: "${process.env.GITHUB_DISCUSSION_CATEGORY_ID}", orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              id
              number
              title
              url
              body
              createdAt
              comments {
                totalCount
              }
            }
          }
        }
      }
    `,
      {
        owner,
        repo,
      },
    );

    const discussion = response.repository.discussions.nodes.find((d) => d.title === title);

    return discussion || null;
  } catch (error) {
    console.error('Error finding discussion:', error);
    return null;
  }
}

export async function createDiscussion(title: string, body: string): Promise<Discussion> {
  const graphqlClient = await getGraphQLClient();
  const [owner, repo] = process.env.GITHUB_REPOSITORY!.split('/');

  const mutation = `
    mutation CreateDiscussion($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: {
        repositoryId: $repositoryId,
        categoryId: $categoryId,
        title: $title,
        body: $body
      }) {
        discussion {
          id
          number
          title
          url
          body
          createdAt
          comments {
            totalCount
          }
        }
      }
    }
  `;

  const repoResponse = await graphqlClient<{
    repository: { id: string };
  }>(
    `
    query GetRepoId($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        id
      }
    }
  `,
    { owner, repo },
  );

  const response = await graphqlClient<{
    createDiscussion: {
      discussion: Discussion;
    };
  }>(mutation, {
    repositoryId: repoResponse.repository.id,
    categoryId: process.env.GITHUB_DISCUSSION_CATEGORY_ID!,
    title,
    body,
  });

  return response.createDiscussion.discussion;
}

export async function addDiscussionComment(discussionId: string, body: string): Promise<void> {
  const graphqlClient = await getGraphQLClient();

  await graphqlClient(
    `
    mutation AddDiscussionComment($discussionId: ID!, $body: String!) {
      addDiscussionComment(input: {
        discussionId: $discussionId,
        body: $body
      }) {
        comment {
          id
        }
      }
    }
  `,
    {
      discussionId,
      body,
    },
  );
}

export function formatDiscussionTitle(pageTitle: string, pagePath: string): string {
  let formattedPath = pagePath;

  const pathParts = pagePath.split('/').filter(Boolean);
  if (pathParts.length === 2) {
    formattedPath = `${pagePath}/index`;
  }

  return formattedPath;
}

export function formatDiscussionBody(pageTitle: string, pageUrl: string): string {
  const productionUrl = pageUrl.replace('http://localhost:3000', 'https://docs.hiro.so');

  return `## Documentation Feedback

This discussion thread is for feedback on the following documentation page:

📄 **Page URL**: ${productionUrl}

Share any quick thoughts or suggestions to help us improve it.`;
}

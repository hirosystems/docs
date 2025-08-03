import { type NextRequest, NextResponse } from 'next/server';
import {
  findDiscussionByTitle,
  createDiscussion,
  addDiscussionComment,
  formatDiscussionTitle,
  formatDiscussionBody,
} from '@/lib/github-discussions';

export const runtime = 'nodejs';

interface FeedbackRequest {
  pageTitle: string;
  pagePath: string;
  pageUrl: string;
  helpful: boolean;
  feedback?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    const { pageTitle, pagePath, pageUrl, helpful, feedback } = body;

    if (!pageTitle || !pagePath || !pageUrl || helpful === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const discussionTitle = formatDiscussionTitle(pageTitle, pagePath);

    let discussion = await findDiscussionByTitle(discussionTitle);

    if (!discussion) {
      const discussionBody = formatDiscussionBody(pageTitle, pageUrl);
      discussion = await createDiscussion(discussionTitle, discussionBody);
    }

    const emoji = helpful ? '👍' : '👎';
    const commentBody = feedback
      ? `**Feedback**: ${emoji}\n\n${feedback}`
      : `**Feedback**: ${emoji}`;

    await addDiscussionComment(discussion.id, commentBody);

    return NextResponse.json({
      success: true,
      discussionUrl: discussion.url,
      discussionNumber: discussion.number,
    });
  } catch (error) {
    console.error('Error handling feedback:', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}

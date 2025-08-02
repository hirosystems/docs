export interface FeedbackResponse {
  success: boolean;
  discussionUrl?: string;
  discussionNumber?: number;
  error?: string;
}


export interface FeedbackSubmission {
  pageTitle: string;
  pagePath: string;
  pageUrl: string;
  helpful: boolean;
  feedback?: string;
}
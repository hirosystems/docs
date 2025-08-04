import { type AnnotationHandler, InnerLine } from 'codehike/code';
import { HoverLinkClient } from './hover.client';
import { HoverLineClient } from './hover-line.client';

export const hover: AnnotationHandler = {
  name: 'hover',
  onlyIfAnnotated: true,
  Line: ({ annotation, ...props }) => {
    // This needs to be a client component to access context
    return <HoverLineClient annotation={annotation} {...props} />;
  },
};

export { HoverLinkClient as HoverLink };

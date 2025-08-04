import { type AnnotationHandler, InnerLine } from 'codehike/code';

export const mark: AnnotationHandler = {
  name: 'mark',
  Line: ({ annotation, ...props }) => {
    const color = getColor(annotation);
    return (
      <div
        style={{
          borderLeft: 'solid 2px transparent',
          borderLeftColor: annotation && `rgb(from ${color} r g b / 0.9)`,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.1)`,
        }}
        className="flex"
      >
        <InnerLine merge={props} className="px-2 flex-1" />
      </div>
    );
  },
  Inline: ({ annotation, children }) => {
    const color = getColor(annotation);
    return (
      <span
        style={{
          boxShadow: `0 0 0 1px rgb(from ${color} r g b / 0.5)`,
          backgroundColor: `rgb(from ${color} r g b / 0.13)`,
        }}
        className="rounded px-0.5 py-0 -mx-0.5"
      >
        {children}
      </span>
    );
  },
};

function getColor(annotation?: { query?: string }) {
  const n = Number(annotation?.query || '0') % colors.length;
  return colors[n] || annotation?.query;
}

const colors = ['var(--ch-9)', 'var(--ch-7)', 'var(--ch-8)'];

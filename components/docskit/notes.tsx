import { Code } from './code';
import { WithClientNotes } from './notes.client';

export function WithNotes({ children, ...rest }: { children: React.ReactNode }) {
  // get all the blocks inside <WithNotes />
  // and put them into Context
  const notes = Object.entries(rest)
    .filter(([name]) => name !== 'title' && name !== '_data')
    .map(([name, block]: any) => {
      if (Object.hasOwn(block, 'children')) {
        return {
          name,
          type: block.type || 'prose',
          children: block.children,
        };
      } else if (Object.hasOwn(block, 'value') && Object.hasOwn(block, 'lang')) {
        return {
          name,
          type: 'code',
          children: <Code codeblocks={[block as any]} />,
        };
      } else if (Object.hasOwn(block, 'url') && Object.hasOwn(block, 'alt')) {
        return {
          name,
          type: 'image',
          children: <img src={block.url} alt={block.alt} />,
        };
      } else {
        throw new Error('Invalid block inside <WithNotes />');
      }
    });
  return <WithClientNotes notes={notes}>{children}</WithClientNotes>;
}

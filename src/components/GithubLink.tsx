import React from 'react';

const GithubLink = ({ title = 'GitHub', href }: { title?: string; href: string }) => {
  if (!title) {
    return (
      <a
        className="bg-neutral-300 text-xs p-0.5 rounded-full text-black inline-flex items-center text-bold font-bold hover:text-black hover:bg-neutral-200 hover:no-underline"
        href={href}
        target="_blank"
      >
        <span className="i-bi-github" />
      </a>
    );
  }

  return (
    <a
      className="bg-neutral-300 text-sm px-1 rounded-md text-black inline-flex items-center text-bold font-bold hover:text-black hover:bg-neutral-200 hover:no-underline"
      href={href}
      target="_blank"
    >
      <span className="i-bi-github mr-1" />
      {title}
    </a>
  );
};

export default GithubLink;

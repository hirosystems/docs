import React from "react";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h3 className="text-[1.15rem]">
      <span className="font-light uppercase">
        <span className="text-muted-foreground">/</span> {title}
      </span>
    </h3>
  );
};

export { SectionHeader };

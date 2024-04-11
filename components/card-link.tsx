import React from "react";
import Link from "next/link";

interface CardLinkProps {
  imageUrl: string;
  heading: string;
  description: string;
}

const CardLink: React.FC<CardLinkProps> = ({
  imageUrl,
  heading,
  description,
}) => {
  return (
    <Link
      className="no-underline hover:opacity-100"
      href="/stacks/quickstarts"
      passHref
    >
      <div className="flex flex-col justify-around h-auto group hover:cursor-pointer">
        <div>
          <img
            className="m-0 w-full h-auto rounded-lg transition-transform duration-300 ease-in-out"
            src={imageUrl}
            alt=""
          />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-base font-semibold group-hover:underline">
            {heading}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardLink;

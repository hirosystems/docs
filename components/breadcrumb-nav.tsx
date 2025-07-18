"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbNav() {
  const items = useBreadcrumb();

  // Don't show breadcrumb if there's only one item or no items
  if (items.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : item.url ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.url}>{item.name}</Link>
                  </BreadcrumbLink>
                ) : (
                  <span>{item.name}</span>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

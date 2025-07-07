import React, { type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
}

interface NetworkBadgeProps {
  network: string | React.ReactElement;
}

const NetworkBadge = ({ network }: NetworkBadgeProps) => (
  <>
    {typeof network === "object" && network !== null ? (
      <code className="relative rounded bg-neutral-150 dark:bg-neutral-600 p-1.5 font-mono text-sm text-left text-muted-foreground whitespace-nowrap">
        {(network as React.ReactElement<{ children?: ReactNode }>).props
          .children ?? ""}
      </code>
    ) : (
      <span className="text-muted-foreground whitespace-normal break-words text-base">
        {network}
      </span>
    )}
  </>
);

function CustomTable({ className, ...props }: TableProps) {
  const tableContent = React.Children.toArray(props.children);
  const thead = tableContent.find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === "thead"
  );
  const tbody = tableContent.find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === "tbody"
  );

  const headerRows = thead
    ? React.Children.toArray(
        (thead as React.ReactElement<{ children?: ReactNode }>).props.children
      )
    : [];
  const bodyRows = tbody
    ? React.Children.toArray(
        (tbody as React.ReactElement<{ children?: ReactNode }>).props.children
      )
    : [];
  const rows = [...headerRows, ...bodyRows].filter(
    (row): row is React.ReactElement => React.isValidElement(row)
  );

  if (rows.length === 0) return null;

  const headers = React.Children.toArray(
    (rows[0] as React.ReactElement<{ children?: ReactNode }>).props.children
  ).map((cell) =>
    React.isValidElement(cell)
      ? ((cell as React.ReactElement<{ children?: ReactNode }>).props
          .children ?? "")
      : cell
  );
  const dataRows = rows.slice(1);

  return (
    <div className="my-6 w-full overflow-x-auto md:block grid">
      <Table
        className={cn(
          "w-full border-0 border-b border-border/50 rounded-none",
          className
        )}
      >
        <TableHeader>
          <TableRow className="border-0 border-b border-border">
            {headers.map((header, i) => (
              <TableHead
                key={i}
                className="text-left text-base font-normal text-foreground font-fono h-auto px-4 py-3 bg-background border-0 border-b border-border/50 [&_code]:whitespace-nowrap"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataRows.map((row, i) => {
            const cells = React.Children.toArray(
              (row as React.ReactElement<{ children?: ReactNode }>).props
                .children
            ).map((cell) =>
              React.isValidElement(cell)
                ? ((cell as React.ReactElement<{ children?: ReactNode }>).props
                    .children ?? "")
                : cell
            );
            return (
              <TableRow
                key={i}
                className="bg-background border-0 border-t border-b"
              >
                <TableCell className="py-4 px-4 min-w-[150px] md:min-w-0">
                  <NetworkBadge
                    network={
                      React.isValidElement(cells[0])
                        ? cells[0] // Pass element directly
                        : String(cells[0] ?? "") // Convert others to string
                    }
                  />
                </TableCell>
                {cells.slice(1).map((cell, j) => (
                  <TableCell
                    key={j}
                    className="py-4 px-4 text-muted-foreground whitespace-normal break-words text-base [&_code]:whitespace-nowrap [&_code]:break-keep min-w-[200px] md:min-w-0"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export { CustomTable };

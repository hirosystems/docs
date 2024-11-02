import React from "react";
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
  <code className="relative rounded bg-muted p-1.5 font-mono text-sm text-left text-muted-foreground">
    {typeof network === "object" && network !== null
      ? network.props.children
      : network}
  </code>
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

  const headerRows = thead ? React.Children.toArray(thead.props.children) : [];
  const bodyRows = tbody ? React.Children.toArray(tbody.props.children) : [];
  const rows = [...headerRows, ...bodyRows].filter(
    (row): row is React.ReactElement => React.isValidElement(row)
  );

  if (rows.length === 0) return null;

  const headers = React.Children.toArray(rows[0].props.children).map((cell) =>
    React.isValidElement(cell) ? cell.props.children : cell
  );
  const dataRows = rows.slice(1);

  return (
    <div className="my-6 w-full overflow-y-auto">
      <Table className={cn("w-full", className)}>
        <TableHeader>
          <TableRow>
            {headers.map((header, i) => (
              <TableHead
                key={i}
                className="text-left text-base font-semibold text-foreground"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataRows.map((row, i) => {
            const cells = React.Children.toArray(row.props.children).map(
              (cell) =>
                React.isValidElement(cell) ? cell.props.children : cell
            );
            return (
              <TableRow key={i} className="border-t">
                <TableCell className="py-4">
                  <NetworkBadge network={cells[0]} />
                </TableCell>
                {cells.slice(1).map((cell, j) => (
                  <TableCell
                    key={j}
                    className="py-4 text-muted-foreground whitespace-normal break-words text-base"
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

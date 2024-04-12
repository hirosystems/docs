import Link from "next/link";
import { ArrowUpRight, ListFilter } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wrapper } from "@/components/preview/wrapper";

const guides = [
  {
    title: "How to use your API Key with Stacks.js",
    tags: ["stacks.js", "api keys"],
    image:
      "https://assets-global.website-files.com/5ff21113877dd79ed7913b57/65cd00ef6d7837b6f2cc80bd_Hiro-blog-6.jpg",
    createdAt: new Date().toLocaleDateString(),
  },
  {
    title: "Common Clarity Errors",
    tags: ["smart contracts"],
    image:
      "https://assets-global.website-files.com/5ff21113877dd79ed7913b57/65e21b7984d07c8e4fb7cc7c_Hiro-blog-clarity1.jpg",
    createdAt: new Date().toLocaleDateString(),
  },
  {
    title: "How to get sBTC testnet tokens",
    tags: ["sbtc"],
    image:
      "https://assets-global.website-files.com/5ff21113877dd79ed7913b57/65b403b0747e9406669e4bd3_Hiro-blog-3stack.png",
    createdAt: new Date().toLocaleDateString(),
  },
  {
    title: "Host your own Ordhook Service",
    tags: ["chainhook"],
    image:
      "https://assets-global.website-files.com/5ff21113877dd79ed7913b57/64f75dba8529c17a4d68afe0_Hiro-blog-Ordhook.jpg",
    createdAt: new Date().toLocaleDateString(),
  },
  {
    title: "Test your contracts against PoX4",
    tags: ["testing"],
    image:
      "https://assets-global.website-files.com/5ff21113877dd79ed7913b57/65b29f9c83c30afebd95ce21_Hiro-blog-btc-sc.jpg",
    createdAt: new Date().toLocaleDateString(),
  },
];

export default function ExamplePage(): JSX.Element {
  return (
    <div className="container flex min-h-screen w-full flex-col md:gap-8 max-w-5xl mt-8 px-2">
      <main className="flex flex-1 flex-col space-y-3 gap-4 py-4 md:py-8">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Most Popular
          </h3>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {guides.map((guide) => {
            return (
              <div
                key={guide.title}
                className="flex flex-col relative h-full w-full transform-gpu rounded-lg border bg-white shadow-md dark:bg-card md:max-h-[500px] md:max-w-[500px] group hover:cursor-pointer dark:hover:bg-muted/80"
              >
                <div className="flex flex-col justify-around h-auto">
                  <div className="p-3">
                    <img
                      className="rounded-lg group-hover:scale-95 transition-transform duration-300 ease-in-out"
                      src={guide.image}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start gap-y-3 p-5">
                    <h2 className="text-md font-semibold">{guide.title}</h2>
                    <div className="flex items-center gap-2">
                      {guide?.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Wrapper className="mb-6">
        <div className="flex flex-1 flex-col space-y-3 gap-4 p-4 md:p-8">
          {/* Separate row for the h1 */}
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold">
              All
              <span className="text-sm font-normal text-gray-700 ml-2">
                {guides.length}
              </span>
            </h1>
          </div>
          {/* New row for Input and DropdownMenu, spaced between */}
          <div className="flex justify-between items-center gap-3 mb-2 sm:mb-4">
            <Input placeholder="Search guides" className="w-1/2" />{" "}
            {/* Adjusted for flexible growth */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Array.from(
                  new Set(
                    guides.flatMap((guide) => guide.tags.map((tag) => tag))
                  )
                ).map((tagName) => (
                  <DropdownMenuCheckboxItem key={tagName} className="text-sm">
                    {tagName}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Table remains unchanged */}
          <Table>
            <TableBody>
              {guides?.map((guide) => {
                return (
                  <TableRow key={guide.title} className="cursor-pointer">
                    <TableCell>
                      <div className="text-sm sm:text-md font-medium md:inline">
                        {guide.title}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-2">
                          {guide?.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-background text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {guide.createdAt}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Wrapper>
    </div>
  );
}

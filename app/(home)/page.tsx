import { Cards, Card as MainCard, SmallCard } from "@/components/card";
import { Play } from "lucide-react";
import { API } from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen container py-4 lg:py-16">
      <div className="max-w-full space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl">Welcome to Hiro Docs.</h1>
          <p className="text-4xl">Let's start building.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Play className="text-white" size={24} />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  Stacks Docs
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Find all the guides and resources you need to build on Stacks.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "CLARINET",
                  "CHAINHOOK",
                  "STACKS.JS",
                  "HIRO PLATFORM",
                  "STACKS API",
                  "TOKEN METADATA API",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-200 text-gray-700 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Badge
                variant="secondary"
                className="bg-gray-200 text-gray-700 rounded-full mt-2"
              >
                +3 MORE
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-orange-300 border-2">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center">
                <API className="text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  Bitcoin Docs
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Find all the guides and resources you need to build on Ordinals
                and Runes.
              </p>
              <div className="flex flex-wrap gap-2">
                {["ORDHOOK", "ORDINALS API", "RUNES API"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-200 text-gray-700 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-mono font-bold">
            Need help getting started?
          </h2>
          <p className="text-xl font-mono text-gray-600">
            Check these resources.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["Guides", "Resource #1", "Resource #1", "Resource #2"].map(
              (title, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

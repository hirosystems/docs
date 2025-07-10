import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function useLLMsTxt() {
  const pathname = usePathname();

  // Calculate the static file path based on current pathname
  const getStaticPath = () => {
    if (!pathname || pathname === "/") return "/llms.txt";
    
    // Remove /docs prefix if present
    let path = pathname;
    if (path.startsWith("/docs")) {
      path = path.substring(5);
    }
    
    // For specific pages, use the parent directory's llms.txt
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0) {
      // Remove the last segment (the page name) to get the section
      const sectionPath = segments.slice(0, -1).join("/");
      return sectionPath ? `/${sectionPath}/llms.txt` : "/llms.txt";
    }
    
    return "/llms.txt";
  };

  const staticPath = getStaticPath();

  return useQuery({
    queryKey: ["llms-txt", staticPath],
    queryFn: async () => {
      const response = await fetch(staticPath);
      if (!response.ok) {
        // Fallback to root llms.txt if section-specific doesn't exist
        const rootResponse = await fetch("/llms.txt");
        if (!rootResponse.ok) {
          throw new Error(`Failed to fetch LLM context`);
        }
        return rootResponse.text();
      }
      return response.text();
    },
    staleTime: 30 * 60 * 1000, // 30 minutes (static content)
    gcTime: 60 * 60 * 1000, // 1 hour
    enabled: false, // Only fetch when needed
  });
}

// Hook for getting the current page's markdown URL
export function useCurrentPageMarkdown() {
  const pathname = usePathname();
  
  const getMarkdownUrl = () => {
    if (!pathname) return "";
    
    // Remove /docs prefix if present
    let basePath = pathname;
    if (basePath.startsWith("/docs")) {
      basePath = basePath.substring(5);
    }
    
    // Construct the markdown path
    let mdPath = basePath.startsWith("/") ? basePath : "/" + basePath;
    
    if (mdPath === "/" || mdPath.endsWith("/")) {
      mdPath = mdPath.endsWith("/") ? mdPath + "index" : "/index";
    }
    
    // Return the full URL with .md extension
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}${mdPath}.md`;
  };
  
  return getMarkdownUrl();
}
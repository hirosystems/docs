export default async function ToolsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // Dynamically import the locale-specific page
  try {
    const LocalePage = (await import(`./_pages/page.${locale}`)).default;
    return <LocalePage />;
  } catch (error) {
    // Fallback to English if locale file doesn't exist
    console.log(`No ${locale} translation found for tools page, falling back to English`);
    const EnglishPage = (await import('./_pages/page.en')).default;
    return <EnglishPage />;
  }
}

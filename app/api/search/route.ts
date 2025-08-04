import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

// Cache the search API responses at runtime for optimal performance
export const revalidate = false;

export const { GET } = createFromSource(source);

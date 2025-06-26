import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
  className?: string;
}

export function MethodBadge({ method, className }: MethodBadgeProps) {
  const methodUpper = method.toUpperCase();
  
  // Color mapping based on HTTP method
  const colorMap: Record<string, string> = {
    GET: 'bg-green-500 text-white border-green-500 hover:bg-green-600',
    POST: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600',
    PUT: 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600',
    DELETE: 'bg-red-500 text-white border-red-500 hover:bg-red-600',
    PATCH: 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600',
  };
  
  const colors = colorMap[methodUpper] || 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600';
  
  return (
    <div className={cn(
      'inline-flex items-center rounded px-2 py-1 text-xs font-semibold font-mono',
      'transition-colors border',
      colors,
      className
    )}>
      {methodUpper}
    </div>
  );
}
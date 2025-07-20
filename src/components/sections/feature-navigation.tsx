'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface FeatureNavigationProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function FeatureNavigation({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  className
}: FeatureNavigationProps) {
  return (
    <div className={cn('flex flex-col lg:flex-row gap-4 items-center justify-between', className)}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2"
          >
            <Filter className="h-3 w-3" />
            {category.label}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full lg:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索功能..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
}
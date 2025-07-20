import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight,
  Star,
  Target,
  ExternalLink,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureDetailProps {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category?: string;
  highlight?: boolean;
  badge?: string;
  benefits: string[];
  useCases: string[];
  demoUrl?: string;
  learnMoreUrl?: string;
  className?: string;
}

export function FeatureDetail({
  id,
  icon: Icon,
  title,
  description,
  highlight = false,
  badge,
  benefits,
  useCases,
  demoUrl,
  learnMoreUrl,
  className
}: FeatureDetailProps) {
  return (
    <Card
      id={id}
      className={cn(
        'group transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        highlight 
          ? 'border-primary/20 bg-gradient-to-br from-primary/5 to-background' 
          : 'hover:border-primary/30',
        className
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'p-3 rounded-lg transition-colors duration-300',
            highlight 
              ? 'bg-primary/10 text-primary' 
              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          )}>
            <Icon className="h-6 w-6" />
          </div>
          {badge && (
            <Badge variant={highlight ? 'default' : 'secondary'}>
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Benefits */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            核心优势
          </h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ChevronRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            应用场景
          </h4>
          <ul className="space-y-2">
            {useCases.map((useCase, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ChevronRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        {(demoUrl || learnMoreUrl) && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            {demoUrl && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a href={demoUrl} className="flex items-center gap-2">
                  <Play className="h-3 w-3" />
                  查看演示
                </a>
              </Button>
            )}
            {learnMoreUrl && (
              <Button variant="ghost" size="sm" asChild className="flex-1">
                <a href={learnMoreUrl} className="flex items-center gap-2">
                  <ExternalLink className="h-3 w-3" />
                  了解更多
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
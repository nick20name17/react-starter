// Adjust the import path as necessary
import { Link, isMatch, useMatches } from '@tanstack/react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

interface BreadcrumbsProps {
  className?: string
}
export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  const matches = useMatches()

  if (matches.some((match) => match.status === 'pending')) return null

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumb'))

  const lastIndex = matchesWithCrumbs.length - 1

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) => (
          <BreadcrumbItem key={match.id}>
            {i === lastIndex ? (
              <BreadcrumbPage>{match.loaderData?.crumb}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={match.fullPath}>{match.loaderData?.crumb}</Link>
              </BreadcrumbLink>
            )}
            {i < lastIndex ? <BreadcrumbSeparator /> : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

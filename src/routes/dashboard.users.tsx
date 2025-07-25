import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users')({
  component: RouteComponent,
  loader: () => {
    return { crumb: 'Users' }
  }
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}

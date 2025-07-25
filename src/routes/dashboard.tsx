import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: () => {
    return { crumb: 'Dashboard' }
  }
})

function RouteComponent() {
  return <Link to='/dashboard/users'>Dashboard users</Link>
}

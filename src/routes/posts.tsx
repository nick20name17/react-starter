import { Link, createFileRoute } from '@tanstack/react-router'

const posts = [
  {
    id: '1',
    name: 'Test'
  },
  {
    id: '2',
    name: 'Test 2'
  }
]

const RouteComponent = () => {
  return (
    <div className='grid grid-cols-4 gap-10'>
      {posts.map((post) => {
        return (
          <Link
            to='/post/$postId'
            params={{ postId: post.id }}
          >
            {post.name}
          </Link>
        )
      })}
    </div>
  )
}

export const Route = createFileRoute('/posts')({
  component: RouteComponent,
  loader: () => {
    return {
      crumb: 'Posts'
    }
  }
})

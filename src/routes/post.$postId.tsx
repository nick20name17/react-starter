import { createFileRoute } from '@tanstack/react-router'

const PostComponent = () => {
  const { postId } = Route.useParams()
  return <div>Post ID: {postId}</div>
}

export const Route = createFileRoute('/post/$postId')({
  component: PostComponent,
  loader: () => {
    return {
      crumb: 'Post'
    }
  }
})

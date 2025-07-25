import { Link } from '@tanstack/react-router'

import { ModeToggle } from '@/components/common/mode-toggle'
import { NavUser } from '@/components/common/nav-user'

export const Header = () => {
  return (
    <header className='container flex h-[var(--header-height)] items-center gap-2 border-b'>
      <Link
        to='/'
        className='[&.active]:font-bold'
      >
        Home
      </Link>{' '}
      <Link
        to='/about'
        className='[&.active]:font-bold'
      >
        About
      </Link>
      <Link
        to='/posts'
        className='[&.active]:font-bold'
      >
        Posts
      </Link>
      <Link
        to='/dashboard'
        className='[&.active]:font-bold'
      >
        Dashboard
      </Link>
      <div className='ml-auto flex items-center gap-2'>
        <ModeToggle />
        <NavUser />
      </div>
    </header>
  )
}

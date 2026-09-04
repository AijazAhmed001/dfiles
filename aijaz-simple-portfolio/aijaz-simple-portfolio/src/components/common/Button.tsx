import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({ href, children, variant = 'primary' }: Props) {
  return (
    <a className={`button button--${variant}`} href={href}>
      {children}
    </a>
  )
}

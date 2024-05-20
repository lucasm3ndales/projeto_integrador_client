import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant/expense')({
  component: () => <div>Hello /_servant/expense!</div>
})
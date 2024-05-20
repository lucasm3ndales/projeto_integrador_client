import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant/departament')({
  component: () => <div>Hello /_servant/departament!</div>
})
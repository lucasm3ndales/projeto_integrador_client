import { Servant } from '@/layouts/Servant'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant')({
  component: () => <Servant />
})
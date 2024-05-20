import { ServantEvent } from '@/pages/ServantEvent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant/event')({
  component: () => <ServantEvent />
})
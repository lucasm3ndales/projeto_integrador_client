import { EventDetails } from '@/pages/EventDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_departament/details-dep/$eventId')({
  component: () => <EventDetails />,
})
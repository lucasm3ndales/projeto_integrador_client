import { EventDetails } from '@/pages/EventDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rectory/details-rec/$eventId')({
    component: () => <EventDetails />,
})

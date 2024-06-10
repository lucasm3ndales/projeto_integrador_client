import { EventDetails } from '@/pages/EventDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant/details/$eventId')({
    component: () => <EventDetails />,
})

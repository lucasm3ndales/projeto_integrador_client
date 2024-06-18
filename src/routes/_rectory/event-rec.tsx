import { ViewEvents } from '@/pages/ViewEvents'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rectory/event-rec')({
    component: () => <ViewEvents />,
})

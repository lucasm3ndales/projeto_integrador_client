import { ViewEvents } from '@/pages/ViewEvents'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_departament/event-dep')({
    component: () => <ViewEvents />,
})

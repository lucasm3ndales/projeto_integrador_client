import { Rectory } from '@/layouts/Rectory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rectory')({
    component: () => <Rectory />,
})

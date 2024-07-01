import { ViewUnities } from '@/pages/ViewUnities'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant/departament-servant')({
    component: () => <ViewUnities />,
})

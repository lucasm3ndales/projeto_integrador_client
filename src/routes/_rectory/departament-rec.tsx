import { ViewUnities } from '@/pages/ViewUnities'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rectory/departament-rec')({
    component: () => <ViewUnities />,
})

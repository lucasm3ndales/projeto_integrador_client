import { DepartamentHome } from '@/pages/DepartamentHome'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_departament/departament')({
    component: () => <DepartamentHome  />,
})

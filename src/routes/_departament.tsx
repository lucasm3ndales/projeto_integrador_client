import { Departament } from '@/layouts/Departament'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_departament')({
    component: () => <Departament />,
})

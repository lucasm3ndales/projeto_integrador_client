import { ViewExpenses } from '@/pages/ViewExpenses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant/expense')({
    component: () => <ViewExpenses />,
})
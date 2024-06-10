import { Module } from '@/pages/Module'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/module')({
    component: () => <Module />,
})

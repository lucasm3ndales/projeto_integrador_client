import { ServantHome } from '@/pages/ServantHome'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_servant/servidor')({
  component: () => <ServantHome />
})
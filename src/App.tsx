import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { Toaster } from 'sonner'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Reegister {
        router: typeof router
    }
}

export function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    )
}

import { Link, Outlet } from "@tanstack/react-router";


export function Servant() {
    return (
        <>
            <div className='flex flex-col items-center px-2 py-4 w-24 h-screen fixed bg-background dark:bg-dark-background border-e border-tertiary dark:border-dark-tertiary'>
                <div className='font-bold text-2xl text-primary dark:text-dark-primary'>
                   Logo
                </div>
                <Link to='/servant-home'>
                
                </Link>
                <Link to='/events'>
                
                </Link>
                <Link to='/expenses'>
                
                </Link>
                <Link to='/departaments'>
                
                </Link>
            </div>
            <Outlet />
        </>
    )
}
import { AuthDTO } from "@/models/user"
import { useEffect, useState } from "react"


export const useStorage = () =>  {
    const [user, setUser] = useState<AuthDTO | null>(null)

    useEffect(() => {
        const item = localStorage.getItem('user')
        if(item) {
            setUser(JSON.parse(item))
        }
    }, [])

    const saveUser = (dto: AuthDTO) => {
        const item = JSON.stringify(dto)
        localStorage.setItem('user', item)
        setUser(dto)
    }

    const removeUser  = () => {
        localStorage.removeItem('user'),
        setUser(null)
    }

    return {
        saveUser,
        removeUser,
        user
    }
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthDTO } from '@/models/user'

interface UserState {
    user: AuthDTO | null 
}

const storedUser = localStorage.getItem('user')
const initialState: UserState = {
    user: storedUser ? JSON.parse(storedUser) : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthDTO | null>) => {
            state.user = action.payload 
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        clearUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

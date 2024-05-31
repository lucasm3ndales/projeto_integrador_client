import { createSlice } from '@reduxjs/toolkit'
import { AuthDTO } from '@/models/user'

interface UserState {
    user: Partial<AuthDTO>
}

const initialState: UserState = {
    user: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        clearUser: () => {
            localStorage.removeItem('user')
        },
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventDTO } from '@/models/event'

interface FormState {
    eventData: Partial<EventDTO>
}

const initialState: FormState = {
    eventData: {},
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<Partial<EventDTO>>) => {
            state.eventData = { ...state.eventData, ...action.payload }
        },
    },
})

export const { updateFormData } = formSlice.actions
export default formSlice.reducer

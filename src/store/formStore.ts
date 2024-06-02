import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventDTO } from '@/models/event'

interface FormState {
    eventData: Partial<EventDTO>
}

const initialState: FormState = {
    eventData: {
        name: '',
        type: '',
        periodicity: '',
        startDate: '',
        endDate: '',
        departureDate: '',
        backDate: '',
        goal: '',
        participants: 0,
        cost: 0.0,
        origin: undefined,
        destiny: undefined,
        address: {
            country: '',
            state: '',
            city: '',
            district: '',
            street: '',
            num: '',
            complement: '',
        },
        documents: [],
        eventExpenses: [],
    },
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<Partial<EventDTO>>) => {
            state.eventData = {
                ...state.eventData,
                ...action.payload,
                address: {
                    ...state.eventData.address,
                    ...action.payload.address,
                },
            }
        },
    },
})

export const { updateFormData } = formSlice.actions
export default formSlice.reducer

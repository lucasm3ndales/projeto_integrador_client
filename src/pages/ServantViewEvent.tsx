import { Event, EventFilter } from '@/models/event'
import { getEvents } from '@/services/eventService'
import { RootState } from '@/store'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

interface Pageable {
    page: number
    sort: string
    size: number
}

export function ServantViewEvent() {
    const user = useSelector((state: RootState) => state.user.user)
    const [events, setEvents] = useState<Event[]>([])
    const [pageable, setPageable] = useState<Pageable>({
        page: 0,
        sort: '',
        size: 10,
    })

    const [filter, setFilter] = useState<EventFilter>({
        sort: '',
        page: 0,
        size: 10,
        name: '',
        periodicity: '',
        status: '',
        startDate: '',
        endDate: '',
        archived: false,
    })

    useEffect(() => {
        if (events && events.length <= 0 && user) {
            getEvents(user.id, filter)
                .then((res: AxiosResponse<Event[]>) => {
                    console.log(res.data)
                    setEvents(res.data.content)
                })
                .catch((err: AxiosError) => {
                    toast.error(
                        (err?.response?.data as string) ||
                            'Erro ao buscar eventos!',
                        {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                        },
                    )
                })
        }
    }, [events, user])

    return (
        <main className='flex w-full justify-center lg:ms-12 lg:mt-14'>
            <div className='flex flex-col'>
                <div>dfsgsd</div>
                <div>dfsgsdfg</div>
            </div>
        </main>
    )
}

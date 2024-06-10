import { RegisterEvent } from '@/pages/RegisterEvent'
import { ViewEvents } from '@/pages/ViewEvents'
import { Tab, Tabs } from '@nextui-org/tabs'
import { Key, useState } from 'react'

export function ServantEvent() {
    const [key, setKey] = useState<string>('view')

    return (
        <>
            <Tabs
                fullWidth
                size='md'
                radius='md'
                variant='underlined'
                selectedKey={key}
                onSelectionChange={(k: Key) => setKey(k as string)}
                className='mt-28 lg:ms-12 lg:mt-0'
                classNames={{
                    tabList: [
                        'border-b border-tertiary dark:border-dark-tertiary pb-0',
                    ],
                    tabContent: [
                        'text-secondary dark:text-dark-secondary group-data-[selected=true]:text-primary dark:group-data-[selected=true]:text-dark-primary',
                    ],
                    cursor: ['bg-primary dark:bg-dark-primary'],
                }}
            >
                <Tab key='view' title='Visualizar Eventos'>
                    <ViewEvents />
                </Tab>
                <Tab key='register' title='Registrar Evento'>
                    <RegisterEvent />
                </Tab>
            </Tabs>
        </>
    )
}

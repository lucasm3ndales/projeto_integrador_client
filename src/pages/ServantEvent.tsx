import { RegisterEvent } from '@/pages/RegisterEvent'
import { ServantViewEvent } from '@/pages/ServantViewEvent'
import { Tab, Tabs } from '@nextui-org/tabs'

export function ServantEvent() {
    return (
        <>
            <Tabs
                fullWidth
                size='md'
                radius='md'
                variant='underlined'
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
                <Tab key='register' title='Registrar Evento'>
                    <RegisterEvent />
                </Tab>
                <Tab key='view' title='Visualizar Eventos'>
                    <ServantViewEvent />
                </Tab>
            </Tabs>
        </>
    )
}

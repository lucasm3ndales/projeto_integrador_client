import { RegisterEvent } from '@/pages/RegisterEvent'
import { ServantViewEvent } from '@/pages/ServantViewEvent'
import { Tab, Tabs } from '@nextui-org/tabs'

export function ServantEvent() {
    return (
        <div className='flex flex-col lg:flex-row'>
            <Tabs
                fullWidth
                size='md'
                radius='md'
                variant='underlined'
                className='mt-24 lg:ms-24 lg:mt-0'
                classNames={{
                    tabList: ['border-b border-tertiary dark:border-dark-tertiary pb-0'],
                    tab: [''],
                    tabContent: ['text-secondary dark:text-dark-secondary group-data-[selected=true]:text-primary dark:group-data-[selected=true]:text-dark-primary'],
                    cursor: ['bg-primary dark:bg-dark-primary']

                }}
            >
                <Tab key='register' title='Registrar Evento'>
                    <RegisterEvent />
                </Tab>
                <Tab key='view' title='Visualizar Eventos'>
                    <ServantViewEvent />
                </Tab>
            </Tabs>
        </div>
    )
}

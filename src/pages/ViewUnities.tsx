import { DepartamentSaveForm } from '@/components/DepartamentSaveForm'
import { DepartamentUpdateForm } from '@/components/DepartamentUpdateForm'
import { Unity, UnityFilter, UnityType } from '@/models/unity'
import { UnityManagerUserDto } from '@/models/unityManager'
import { Role } from '@/models/user'
import { getUnityManagersByUnityIds } from '@/services/managerService'
import { getUnities } from '@/services/unityService'
import { RootState } from '@/store'
import {
    Input,
    Table,
    Pagination,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react'
import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

interface Pageable {
    page: number
    sort: string
    size: number
    totalPages: number
}

interface Item {
    unity: string
    type: UnityType
    manager: string
    unityId: number
    userId: number
}

export const ViewUnities = () => {
    const [unities, setUnities] = useState<Unity[]>([])
    const [managers, setManagers] = useState<UnityManagerUserDto[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [search, setSearch] = useState<string>('')
    const user = useSelector((state: RootState) => state.user.user)
    const [pageable, setPageable] = useState<Pageable>({
        page: 0,
        sort: '',
        size: 10,
        totalPages: 0,
    })
    const [filter, setFilter] = useState<UnityFilter>({
        sort: '',
        page: 0,
        size: 10,
        type: UnityType.DEPARTAMENTO,
        search: '',
    })
    const columnUnities1 = [
        { key: 'name', label: 'NOME' },
        { key: 'type', label: 'TIPO' },
        { key: 'manager', label: 'RESPONSÁVEL' },
    ]

    const columnUnities2 = [
        { key: 'name', label: 'NOME' },
        { key: 'type', label: 'TIPO' },
        { key: 'manager', label: 'RESPONSÁVEL' },
        { key: 'update', label: 'ALTERAR' },
    ]

    const renderTableUnity = useCallback((item, columnKey) => {
        const cellValue = item[columnKey]

        if (user?.role === Role.PRO_REITOR) {
            switch (columnKey) {
                case 'update':
                    return <DepartamentUpdateForm id={item.unityId} />
                    break
                case 'manager':
                    return item.manager
                    break
                case 'name':
                    return item.unity
                    break
                default:
                    return cellValue
                    break
            }
        } else {
            switch (columnKey) {
                case 'manager':
                    return item.manager
                    break
                case 'name':
                    return item.unity
                    break
                default:
                    return cellValue
                    break
            }
        }
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleUnity = useCallback(async () => {
        await getUnities(filter)
            .then((res: AxiosResponse<Unity[] | any>) => {
                //console.log(res.data.content)
                setUnities(res.data.content)
                setPageable({
                    size: res.data.size,
                    sort: res.data.sort,
                    page: res.data.number,
                    totalPages: res.data.totalPages,
                })
            })
            .catch((err: AxiosError) => {
                toast.error(
                    (err?.response?.data as string) ||
                        'Unidades não encontradas!',
                    {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    },
                )
            })
    }, [filter])

    const handleManagers = useCallback(async () => {
        const ids = unities.map(u => u.id as number)
        await getUnityManagersByUnityIds(ids)
            .then((res: AxiosResponse<UnityManagerUserDto[]>) => {
                setManagers(res.data)
            })
            .catch((err: AxiosError) => {
                toast.error(
                    (err?.response?.data as string) ||
                        'Responsáveis não encontrados!',
                    {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    },
                )
            })
    }, [unities])

    useEffect(() => {
        handleUnity()
    }, [handleUnity])

    useEffect(() => {
        if (unities && unities.length > 0) {
            handleManagers()
        }
    }, [handleManagers, unities])

    useEffect(() => {
        if (unities && managers && unities.length > 0 && managers.length > 0) {
            let list: Item[] = []

            list = unities.map(u => {
                const m = managers.find(m => m.unityId === u.id)

                if (m) {
                    const item: Item = {
                        unity: u.name,
                        manager: m?.manager,
                        unityId: u.id as number,
                        userId: m?.userId,
                        type: u.type as UnityType,
                    }
                    return item
                }
            })
            if (list.length > 0) {
                setItems(list)
            } else {
                setItems([])
            }
        } else {
            setItems([])
        }
    }, [unities, managers])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (search.trim() !== filter.search) {
                setFilter(state => ({
                    ...state,
                    search: search.trim(),
                }))
                handleUnity()
            }
        }, 600)

        return () => clearTimeout(handler)
    }, [search, filter.search, handleUnity])

    useEffect(() => {
        if (pageable.page != filter.page) {
            setFilter(state => ({
                ...state,
                page: pageable.page,
            }))
        }
    }, [pageable.page, filter.page, handleUnity])

    return (
        <main className='flex w-full justify-center lg:ms-12'>
            <div className='mt-28 flex w-full flex-col items-center lg:mt-8  lg:w-2/3'>
                <div className='flex h-auto w-full flex-col items-center  space-y-3 rounded-md border border-tertiary px-2 py-4 shadow-lg dark:border-dark-tertiary md:w-3/5 lg:w-[450px]'>
                    <Input
                        label='Pesquisar'
                        variant='bordered'
                        size='sm'
                        onChange={e => setSearch(e.target.value)}
                        type='text'
                        radius='md'
                        classNames={{
                            input: ['bg-transparent'],
                            label: ['text-secondary dark:text-dark-secondary'],
                            inputWrapper: [
                                'text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary bg-transparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                            ],
                            description: [
                                'text-secondary dark:text-dark-secondary',
                            ],
                            errorMessage: ['text-error'],
                        }}
                    />
                    {user && user?.role === Role.PRO_REITOR && (
                        <DepartamentSaveForm />
                    )}
                </div>
                <div className='mt-8 flex h-auto w-full flex-col items-center space-y-3 rounded-md border border-tertiary px-2 py-4 shadow-lg dark:border-dark-tertiary'>
                    <Table
                        aria-label='Despesas'
                        classNames={{
                            wrapper: [
                                'bg-transparent border border-tertiary dark:border-dark-tertiary rounded-md',
                            ],
                            th: [
                                'text-secondary dark:text-dark-secondary bg-transparent',
                            ],
                            emptyWrapper: [
                                'text-secondary dark:text-dark-secondary',
                            ],
                        }}
                    >
                        <TableHeader
                            columns={
                                user && user.role === Role.PRO_REITOR
                                    ? columnUnities2
                                    : columnUnities1
                            }
                        >
                            {column => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={items}
                            emptyContent={'Nenhum Departamento Encontrado!'}
                        >
                            {item => (
                                <TableRow key={item.unityId}>
                                    {columnKey => (
                                        <TableCell className='capitalize'>
                                            {renderTableUnity(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {unities && unities.length > 0 && (
                    <div className='mt-8 flex h-auto w-auto flex-col items-center space-y-3 rounded-md border border-tertiary px-2 py-4 shadow-lg dark:border-dark-tertiary'>
                        <Pagination
                            showShadow
                            size='md'
                            variant='flat'
                            total={pageable.totalPages}
                            page={pageable.page + 1}
                            onChange={(p: number) =>
                                setPageable(state => ({
                                    ...state,
                                    page: p - 1,
                                }))
                            }
                            classNames={{
                                wrapper:
                                    'bg-background dark:bg-dark-background',
                                item: 'rounded-md text-secondary dark:text-dark-secondary bg-transparent shadow-none',
                                cursor: 'bg-primary dark:bg-dark-primary text-background dark:text-dark-background',
                            }}
                        />
                    </div>
                )}
            </div>
        </main>
    )
}

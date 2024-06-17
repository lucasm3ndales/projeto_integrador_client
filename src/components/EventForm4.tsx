import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/table'
import { toast } from 'sonner'
import { updateFormData } from '@/store/formStore'
import { RootState } from '@/store'
import { DocumentDTO, DocumentType, Extensions } from '@/models/document'
import { EventDTO } from '@/models/event'

export const EventForm4 = () => {
    const {
        getValues,
        setValue,
        formState: { errors },
    } = useFormContext<EventDTO>()
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()
    const [items, setItems] = useState<DocumentDTO[]>([])
    const fileInputRef = useRef(null)
    const [document, setDocument] = useState<DocumentDTO>({
        name: '',
        type: '',
        extension: '',
        document: '',
    })
    const columns = [
        { key: 'name', label: 'Nome' },
        { key: 'type', label: 'Tipo' },
        { key: 'actions', label: 'Ações' },
    ]

    useEffect(() => {
        setItems(dto.documents || [])
    }, [dto.documents])

    const setFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e && e.target.files && e.target.files.length > 0) {''
            const doc = e.target.files[0]
            if (doc) {
                const base64 = await convertToBase64(doc)
                if (base64) {
                    const docName = doc.name
                    const docExtension = docName.split('.').pop()?.toUpperCase() as keyof typeof Extensions

                    if (docExtension && Object.values(Extensions).includes(Extensions[docExtension])) {
                        setDocument({
                            ...document,
                            extension: docExtension,
                            document: base64 as string,
                            name: docName,
                        })
                    } else {
                        toast.error('Extensão de arquivo não suportada!', {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                            description:
                                'Por favor, selecione um arquivo com uma extensão suportada.',
                        })
                    }
                } else {
                    toast.error(
                        'Erro ao converter arquivo para o formato esperado!',
                        {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                            description:
                                'Verifique sua conexão com a internet.',
                        },
                    )
                }
            }
        }
    }

    const convertToBase64 = async (
        doc: File,
    ): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(doc)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = error => reject(error)
        })
    }

    const addDocument = () => {
        if (
            document.name &&
            document.type &&
            document.extension &&
            document.document
        ) {
            const currentDocuments = getValues('documents') || []
            const updatedDocuments = [...currentDocuments, document]
            setValue('documents', updatedDocuments)

            dispatch(updateFormData({ documents: updatedDocuments }))

            setDocument({ name: '', type: '', extension: '', document: '' })

            if (fileInputRef.current) {
                (fileInputRef.current as HTMLInputElement).value = ''
            }
        } else {
            toast('Preencha todos os campos do documento!', {
                className:
                    'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                duration: 3000,
                description: 'Todos os campos são obrigatórios.',
            })
        }
    }

    function removeDocument(item: DocumentDTO) {
        const currentDocuments = getValues('documents') || []
        const updatedDocuments = currentDocuments.filter(i => i.name !== item.name)
        setValue('documents', updatedDocuments)
        setItems(updatedDocuments)
        dispatch(updateFormData({ documents: updatedDocuments }))
    }

    return (
        <div className='flex h-auto w-full flex-col items-center justify-center space-y-5'>
            <div className='flex flex-col items-center lg:items-start lg:flex-row space-y-8 lg:space-y-0 w-full justify-center'>
                <div className='flex w-full lg:w-1/2 flex-col items-center space-y-3'>
                    <input
                        ref={fileInputRef}
                        type='file'
                        className='w-72 rounded-md border border-tertiary px-3 py-4 file:rounded-md file:border file:border-tertiary file:bg-transparent file:text-secondary hover:border-primary dark:border-dark-tertiary dark:file:border-dark-tertiary dark:file:text-dark-secondary dark:hover:border-dark-primary'
                        onChange={setFile}
                    />
                    <div className='flex w-72 justify-center'>
                        <Input
                            label='Nome do Documento*'
                            size='sm'
                            variant='bordered'
                            radius='md'
                            isInvalid={errors?.documents ? true : false}
                            value={document.name}
                            onChange={e =>
                                setDocument({
                                    ...document,
                                    name: e.target.value,
                                })
                            }
                            classNames={{
                                input: ['bg-transparent'],
                                label: [
                                    'text-secondary dark:text-dark-secondary',
                                ],
                                inputWrapper: [
                                    'text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary bg-transparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                                ],
                                description: [
                                    'text-secondary dark:text-dark-secondary',
                                ],
                                errorMessage: ['text-error'],
                            }}
                        />
                    </div>
                    <div className='flex w-72 justify-center'>
                        <Select
                            label='Tipo do Documento*'
                            variant='bordered'
                            size='sm'
                            radius='md'
                            className='max-w-xs'
                            value={document.type}
                            onChange={e =>
                                setDocument({
                                    ...document,
                                    type: e.target.value,
                                })
                            }
                            classNames={{
                                label: 'text-secondary dark:text-dark-secondary',
                                trigger:
                                    'bg-transaparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                                listboxWrapper: 'max-h-[400px]',
                                errorMessage: 'text-error',
                            }}
                            listboxProps={{
                                itemClasses: {
                                    base: [
                                        'rounded-md',
                                        'text-secondary dark:text-dark-secondary',
                                        'transition-opacity',
                                        'data-[selectable=true]:focus:bg-primary dark:data-[selectable=true]:focus:bg-dark-primary',
                                        'data-[selectable=true]:focus:text-background dark:data-[selectable=true]:focus:text-dark-background',
                                        'data-[pressed=true]:opacity-70',
                                    ],
                                },
                            }}
                            popoverProps={{
                                classNames: {
                                    base: 'before:bg-background before:dark:bg-dark-background',
                                    content:
                                        'p-0 border-small border-divider bg-background dark:bg-dark-background',
                                },
                            }}
                        >
                            {Object.values(DocumentType).map(t => (
                                <SelectItem key={t} value={t}>
                                    {t.toString()}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Button
                        onClick={addDocument}
                        type='button'
                        size='lg'
                        radius='md'
                        className='mt-8 w-56 bg-success font-semibold text-background'
                    >
                        Adicionar
                    </Button>
                </div>
                <div className='flex w-full lg:w-1/2 flex-col items-center'>
                    <Table
                        aria-label='Example table with dynamic content'
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
                        <TableHeader columns={columns}>
                            {column => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={items}
                            emptyContent={'Nenhum Documento Adicionado!'}
                        >
                            {item => (
                                <TableRow key={item.name}>
                                    {columnKey => (
                                        <TableCell>
                                            {columnKey === 'actions' ? (
                                                <Button
                                                    onClick={() => removeDocument(item)}
                                                    className='bg-error font-semibold text-background'

                                                >
                                                    Remover
                                                </Button>
                                            ) : (
                                                getKeyValue(item, columnKey)
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

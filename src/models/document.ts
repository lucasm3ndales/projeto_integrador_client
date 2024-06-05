
export interface DocumentDTO {
    name: string,
    type: string | DocumentType,
    extension: string | Extensions,
    document: string | File
}

export interface Document {
    id: number
    name: string,
    type: string | DocumentType,
    extension: string | Extensions,
    document: string[]
}

export enum Extensions {
    PDF = 'PDF', 
    DOCX = 'DOCX', 
    DOC = 'DOC', 
    TXT = 'TXT', 
    ODT = 'ODT'
}

export enum DocumentType {
    OUTROS = 'OUTROS',
    ALVARA = 'ALVARA',
    CONTRATO = 'CONTRATO'
}
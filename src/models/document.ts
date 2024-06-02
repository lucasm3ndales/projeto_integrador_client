
export interface DocumentDTO {
    name: string,
    type: string,
    extension: string,
    document: string | File
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
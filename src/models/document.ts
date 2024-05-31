
export interface DocumentDTO {
    name: string,
    type: string,
    extension: string,
    document: string | File
}

export enum Extensions {
    PDF = 'pdf', 
    DOCX = 'docx', 
    DOC = 'doc', 
    TXT = 'txt', 
    ODT = 'odt'
}

export enum DocumentType {
    OUTROS = 'outros',
    ALVARA = 'alvará',
    CONTRATO = 'contrato'
}
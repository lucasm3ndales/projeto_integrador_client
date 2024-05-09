

export interface Credentials {
    username: string,
    password: string
}

export interface AuthDTO {
    id: number,
    active: boolean,
    name: string,
    token: string,
    role: string | Role
}

export enum Role {
    SERVIDOR = 'servidor', 
    CHEFE_DEPARTAMENTO = 'chefe departamento', 
    PRO_REITOR = 'pró-reitor'
}

export interface UserDTO {
    name: string,
    email: string,
    phone: string,
    siape: string,
    username: string,
    password: string
}
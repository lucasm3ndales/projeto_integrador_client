

export interface AddressDTO {
    country: string,
    state: string,
    city: string,
    district: string,
    street: string,
    num?: string,
    complement?: string
}

export interface Address {
    id: number,
    country: string,
    state: string,
    city: string,
    district: string,
    street: string,
    num?: string,
    complement?: string
}
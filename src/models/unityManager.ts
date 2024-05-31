

interface IdUnityManager {
    idUser: number | null,
    idUnity: number | null
}

export interface UnityManager {
    id: IdUnityManager,
    startedOn: string | EpochTimeStamp
}
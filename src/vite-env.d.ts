/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string
}

declare namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {}
}

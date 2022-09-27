export type User = { 
    id: number,
    name: string,
    avatar: string,
    stack: Array<Stack>
}

export type Stack = { 
    id: number,
    label: string,
    logo: string,
    experience: number,
    isPreference: boolean
}

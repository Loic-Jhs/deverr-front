export type Dev = { 
    id: number,
    firstname: string,
    lastname: string,
    description: string,
    avatar: string,
    stacks: Array<Stack>,
    prestations: Array<Prestation>,
    rates: Array<Rate>|null
}

export type Stack = { 
    id: number,
    label: string,
    logo: string,
    experience: number,
    isPreference: boolean
}

export type Prestation = { 
    id: number,
    name: string,
}


export type Rate = { 
    id: number,
    rate: number,
    comment: string|null
}

export type DevProps = {
    devId: number
}
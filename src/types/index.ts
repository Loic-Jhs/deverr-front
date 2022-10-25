export type Dev = {
    id: number,
    firstname: string,
    lastname: string,
    avatar: string,
    average_rating: string|null,
    description: string,
    stacks: Array<RealStack>
    prestations: Array<RealPrestation>,
    register_date: string
}

export type DevInfos = {
    id: number,
    user_id: number,
    avatar: string,
    description: string,
    experience: number,
    registred_at: string,
    firstname: string,
    lastname: string,
    email: string,
    prestations: Array<DevPrestation>
    stacks: Array<RealStack>
    reviews: Array<Review>
}

export type Review = {
    id: number,
    client_id: number,
    client_firstname: string,
    client_lastname: string,
    comment: string,
    rate: number,
    prestation_name: string
}

export type DevPrestation = {
    id: number,
    price: number,
    description: string
}

export type RealStack = {
    id: number,
    logo: string,
    name: string
}

export type RealPrestation = {
    id: number,
    name: string,
}

export type HomepageDev = {
    id: number,
    avatar: string,
    developer_lastname: string,
    developer_firstname: string,
    name: string,
    logo: string,
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
    devID: number
}


export type DevList = {
   id: number,
   avatar: string,
   firstname: string,
   lastname: string,
   average_rating: number|null,
   register_date: string,
   stacks: string,
   prestations: string 
}

export type ProfilStack = {
    id: number,
    label: string,
}

export type ProfileMessage = {
    id: number,
    user_id: number,
    prestation_id: number
}
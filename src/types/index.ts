export type Dev = {
    id: number,
    firstname: string,
    lastname: string,
    avatar: string,
    average_rating: number|null,
    reviews_number: number|null,
    description: string,
    stacks: Array<RealStack>
    prestations: Array<RealPrestation>,
    register_date: string
}

export type DevInfos = {
    id: number,
    avatar: string,
    description: string,
    registered_at: string,
    average_rating: number|null,
    last_order_date: string|null,
    orders_count: number|null,
    firstname: string,
    lastname: string,
    prestations: Array<RealPrestation>,
    stacks: Array<RealStack>,
    reviews: Array<Review>,
    years_of_experience: number
}

export type Review = {
    id: number,
    client_id: number,
    client_firstname: string,
    client_lastname: string,
    comment: string,
    rating: number,
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
    lastname: string,
    firstname: string,
    stack: string
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
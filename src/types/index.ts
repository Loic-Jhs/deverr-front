import {number} from "yup";

export type Dev = {
    id: number;
    firstname: string;
    lastname: string;
    avatar: string;
    average_rating: number | null;
    reviews_number: number | null;
    description: string;
    stacks: Array<Stack>;
    prestations: Array<Prestation>;
    register_date: string;
};

export type Order = {
    id: number;
    created_at: string;
    prestation_name: string;
    instructions: string | null;
    is_payed: number;
    is_accepted_by_developer: number | null;
    is_finished: number;
    price: number;
    user_fullname: string;
};

export type DevInfos = {
    id: number;
    avatar: string;
    description: string;
    registered_at: string;
    average_rating: number | null;
    last_order_date: string | null;
    orders_count: number | null;
    firstname: string;
    lastname: string;
    prestations: Array<Prestation>;
    stacks: Array<DevStack>;
    reviews: Array<Review>;
    years_of_experience: number;
};

export type UserInfos = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    registered_at: string;
    orders: Array<{
        id: number;
        developer: string;
        instructions: string;
        is_finished: boolean;
        is_paid: boolean;
        is_accepted_by_developer: boolean;
        price: number;
        prestation_name: string;
        prestation_id: number;
        created_at: string;
        updated_at: string;
    }>;
};

export type UserAsContext = {
    access_token?: string;
    token_type?: string;
    user_info?: UserInfo;
};

export type UserInfo = {
    developer_id: number;
    user_id: number;
    user_role: string;
};

export type Review = {
    id: number;
    client_id: number;
    user_who_reviewed: string;
    comment: string;
    rating: number;
    prestation_name: string;
    created_at: string;
};

export type DevPrestation = {
    id: number;
    price: number;
    description: string;
};

export type Stack = {
    id: number;
    logo: string;
    name: string;
};

export type Prestation = {
    id: number;
    name: string;
    description: string;
    price: number;
    prestation_type_id: number;
};

export type HomepageDev = {
    id: number;
    avatar: string;
    lastname: string;
    firstname: string;
    stack: {
        name: string;
        logo: string;
    };
};

export type DevStack = {
    id: number;
    name: string;
    experience: number;
    is_primary: number;
    logo: string;
};

export type Rate = {
    id: number;
    rate: number;
    comment: string | null;
};

export type DevProps = {
    devID: number;
};

export type DevList = {
    id: number;
    avatar: string;
    firstname: string;
    lastname: string;
    average_rating: number | null;
    register_date: string;
    stacks: string;
    prestations: string;
};

export type ProfilStack = {
    id: number;
    label: string;
};

export type ProfileMessage = {
    id: number;
    user_id: number;
    prestation_id: number;
};

export type ForgotPasswordType = {
    email: string;
};

export type ResetPasswordType = {
    email: string;
    password: string;
    password_confirmation: string;
};

export type OrderInfoType = {
    id: number;
    reference: string
    prestation: string;
    fullname: string;
    developer_id: number;
}

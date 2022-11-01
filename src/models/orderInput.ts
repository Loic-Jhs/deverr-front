export interface OrderInput {
  instruction: string,
}

export interface OrderSelect {
  prestation_id: number,
}

export interface OrderMessage {
  status: string,
  message: string,
}
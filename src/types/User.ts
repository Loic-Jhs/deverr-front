type User = {
  user_info : {
    id: number | null,
    role_id: string | null,
    email: string | null,
    firstname: string | null,
    lastname: string | null,
  },
  token_type: string | null,
  access_token: string | null,
}
export default User;
export default interface DevInput {
  firstname: string,
  lastname: string,
  role: number,
  stacks: {
    id: number,
    name: string,
    experience: number,
    is_primary: boolean,
  }[],
  years_of_experience: number,
  description: string,
  email: string,
  password: string,
  confirmedPassword: string,
  type: string,
}
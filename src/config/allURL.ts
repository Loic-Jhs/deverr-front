const localURL = "http://localhost";
const prodURL = "https://api.deverr.fr";

export const allURL = {
  home : () => `${localURL}/`,
  register : () => `${localURL}/register`,
  devDetails : (id: number) => `${localURL}/dev-profile/${id}`,
  devProfile : () => `${localURL}/dev-profile`,
  clientProfile : () => `${localURL}/my-profile`,
  devOrder : (id: number) => `${localURL}/dev-order/${id}`,
  devList : () => `${localURL}/developers`,
  formDev : () => `${localURL}/registerdev`,
  formClient : () => `${localURL}/registerclient`,
  login : () => `${localURL}/login`,
  forgotPassword : () => `${localURL}/forgot-password`,
  resetPassword : (token: string) => `${localURL}/reset-password/${token}`,
}

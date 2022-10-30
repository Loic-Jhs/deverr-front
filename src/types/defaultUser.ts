// L'utilisateur par défaut sera la valeur par défaut pour le contexte AuthContext, tout est null.
import User from "./User";

export const defaultUser: User = {
  user_info : {
    id: null,
    role_id: null,
    email: null,
    firstname: null,
    lastname: null,
  },
  token_type: null,
  access_token: null,
};
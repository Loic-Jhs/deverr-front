// L'utilisateur par défaut sera la valeur par défaut pour le contexte AuthContext, tout est null.
import User from "./User";

export const defaultUser: User = {
  user_id: null,
  developer_id: null,
  user_role: null,
  token_type: undefined,
  access_token: undefined,
};
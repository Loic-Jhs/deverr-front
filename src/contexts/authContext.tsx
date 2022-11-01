import React, { createContext, useEffect, useMemo, useState } from "react";
import { UserAsContext } from "../types";

export const authContext = createContext<any>({}); 

function AuthProvider({ children }: React.PropsWithChildren) {
    const [auth, setAuth] = useState<UserAsContext>({ access_token: undefined, token_type: undefined, user_info: undefined });

    const resetState = () => {
        setAuth({ access_token: undefined, token_type: undefined, user_info: undefined });
    };

    return (
        <authContext.Provider
            value={{ auth, setAuth, resetState }}
        >
            {children}
        </authContext.Provider>
    );
}


export default AuthProvider;

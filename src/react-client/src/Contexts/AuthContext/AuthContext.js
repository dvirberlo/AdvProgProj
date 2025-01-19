import { createContext, useContext, Context } from "react";
import { usePersistence } from "../persistenceHook";

/** @type {Context<{auth: {token: string?, _id: string?, role: string?}, setAuth: function(object): void}>} */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = usePersistence("auth", {
    token: null,
    userId: null,
    role: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @example
 * ```js
 * const { auth, setAuth } = useAuth();
 * const { token, _id, role } = auth;
 * return (
 *   <div>
 *     <p>we can send http requests using the token</p>
 *     <p>if the token or userId is null, we know the user is not logged in</p>
 *     <button
 *       onClick={() => {
 *         setToken("tokenFromServer");
 *         setUser("userIdFromServer");
 *       }}
 *     >
 *       login
 *     </button>
 *   </div>
 * );
 * ```
 */
export const useAuth = () => useContext(AuthContext);

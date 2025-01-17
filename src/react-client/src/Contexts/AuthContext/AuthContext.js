import { createContext, useState, useContext, Context } from "react";

/** @type {Context<{token: string | null, setToken: function(string | null): void, userId: string | null, setUserId: function(string | null): void}>} */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @example
 * ```js
 * const { token, setToken, user, setUser } = useAuth();
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

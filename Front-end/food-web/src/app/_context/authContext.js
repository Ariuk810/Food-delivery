"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async (localToken) => {
    try {
      const rawData = await fetch("http://localhost:1000/users/me", {
        method: "GET",
        headers: {
          authorization: `${localToken}`,
        },
      });
      const data = await rawData.json();
      console.log(data, "data");

      setUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        getUser(localToken);
        return setToken(localToken);
      }
      return setToken("no token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 1. Context create
// 2. Context Provider create
// 3. Provider => layout
// 4. token avah, me endpoint
// 5. Page deeree Context ashiglasan

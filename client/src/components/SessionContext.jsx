import  { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/check_session");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setLogged(true);
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, logged }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
import React, { createContext, useState } from 'react'
export const AppContent = createContext();
const AppcontextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [currentUser,setCurrentUser] = useState("JS");
    const value={
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser
    };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  )
}

export default AppcontextProvider;
import React, { createContext, useState } from 'react'
export const AppContent = createContext();
const AppcontextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const value={
        isLoggedIn,
        setIsLoggedIn,
    };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  )
}

export default AppcontextProvider;
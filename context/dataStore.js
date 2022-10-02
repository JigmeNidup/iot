import { createContext, useContext, useState } from "react";

const Data = createContext();

export function useDataStore() {
  return useContext(Data);
}

export default function DataProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Data.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </Data.Provider>
  );
}

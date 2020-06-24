import React, { createContext } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  return <PlayerContext.Provider>{children}</PlayerContext.Provider>;
};

export default PlayerContextProvider;

import React from 'react'
import { createContext, useEffect, useState } from 'react';
export const DataContext = createContext();

function MyEventContext({ children }) {
  //useStates
  const value = {};

  return (
    <DataContext.Provider value={value} >
      {children}
    </DataContext.Provider>
  );
}

export default MyEventContext;
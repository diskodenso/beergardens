import React, {createContext, useState} from 'react'
// import { children } from 'react'

// 2. initialize context

const initBeergardensContext = {
   beergardens: []
};
// 3. create context

export const BeergardensContext = createContext(initBeergardensContext);

// 4. make provider => value / children

export const BeergardensContextProvider = ({ children }) => {
   const [beergarden, setBeergardens] = useState(
      initBeergardensContext.beergardens);
   return (
      <BeergardensContext.Provider value={{ beergardens, setBeergardens }}>
         {children}
      </BeergardensContext.Provider>
   )
}
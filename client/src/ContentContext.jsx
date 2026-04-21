import { createContext, useContext } from 'react';

export const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

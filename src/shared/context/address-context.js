import { createContext } from 'react';

export const AuthContext = createContext({
  selectedAddress: null,
  allAddresses: []
});
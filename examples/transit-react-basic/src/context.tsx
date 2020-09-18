import { WalletAuth, WalletProvider } from "eos-transit/lib";
import React, { useState } from "react";

interface ContextType {
  wallet: WalletProvider | null;
  account: WalletAuth | null;
  setAuth: (props: { wallet: WalletProvider; account: WalletAuth }) => void;
}

export const AuthContext = React.createContext<ContextType>({
  wallet: null,
  account: null,
  setAuth: () => {},
});

export const Auth: React.FC = React.memo(({ children }) => {
  const [state, setState] = useState<Omit<ContextType, "setAuth">>({
    account: null,
    wallet: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, setAuth: setState }}>
      {children}
    </AuthContext.Provider>
  );
});

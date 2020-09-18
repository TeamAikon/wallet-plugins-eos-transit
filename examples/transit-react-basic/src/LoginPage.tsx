import React, { useContext, useEffect, useState } from "react";

import WAL, { WalletProvider } from "eos-transit";
import { AuthContext } from "./context";
import { Redirect } from "react-router-dom";

interface Props {}

export const LoginPage: React.FC<Props> = React.memo(() => {
  const { setAuth } = useContext(AuthContext);
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const { getWalletProviders } = WAL.accessContext;
    setState({ providers: getWalletProviders() });
  }, []);

  const login = async (wallet: WalletProvider) => {
    WAL.accessContext.initWallet(wallet);
    try {
      const res = await wallet.connect("AlgoSignerApp");
      if (res) {
        const lres = await wallet.login();
        if (lres) {
          console.log(lres);
          setAuth({ wallet, account: lres });
          setState({ ...state, auth: lres });
        }
      }
    } catch (e) {
      alert(`Login Failed: ${e}`);
    }
  };

  if (state.auth) return <Redirect to="/payment" />;

  return (
    <div>
      {state.providers &&
        state.providers.map((p: any) => {
          return <button onClick={() => login(p)}>{p.meta.name}</button>;
        })}
    </div>
  );
});

import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context";
import { LoginPage } from "./LoginPage";
import { PaymentPage } from "./PaymentPage";

export const Router: React.FC = React.memo(() => {
  const { wallet, account, setAuth } = useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
            {wallet && account && (
              <Route path="/payment" component={PaymentPage} />
            )}
            {!wallet && <Redirect to="/login" />}
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
});

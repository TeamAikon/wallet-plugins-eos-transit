import React, { useContext, useState } from "react";

import { ChainFactory } from "@open-rights-exchange/chainjs";
import { ChainType } from "@open-rights-exchange/chainjs/dist/models";
import {
  AlgorandActionPaymentParams,
  AlgorandChainActionType,
} from "@open-rights-exchange/chainjs/dist/chains/algorand_1/models";

import * as msgpack from "@msgpack/msgpack/dist";

import { AuthContext } from "./context";

interface Props {}

function encodeToUint8Array(obj: any) {
  return msgpack.encode(obj, { sortKeys: true });
}

const algoApiKey = "MsmR0dy1P28Ztt79sLBcs964vplMD69qGOMZbJ84";

const algoTestnetEndpoints = [
  {
    url: new URL("https://testnet-algorand.api.purestake.io/ps1"),
    options: { headers: [{ "X-API-Key": algoApiKey }] },
  },
];

const composeAlgoPaymentParams: Partial<AlgorandActionPaymentParams> = {
  to: "TF6PJW7VSEKD5AXYMUXF5YGMPDUWBJQRHH4PYJISFPXAMI27PGYHKLALDY",
  note: "a",
  amount: 1,
};

export const PaymentPage: React.FC<Props> = React.memo(({}) => {
  const { wallet, account } = useContext(AuthContext);

  const [state, setState] = useState<any>({});

  const pay = async () => {
    const payStateObject = {
      loading: false,
      signedTransaction: null,
      signature: null,
    };

    setState({ loading: true });
    const { toAddr, amount } = state;

    try {
      if (!toAddr || !parseInt(amount))
        throw new Error("Please provide correct amount and address.");
      const chain = new ChainFactory().create(
        ChainType.AlgorandV1,
        algoTestnetEndpoints
      );

      await chain.connect();
      if (!chain.isConnected) {
        Promise.reject("Couldnt connect to Algorand chain.");
      }

      const action = await chain.composeAction(
        AlgorandChainActionType.Payment,
        {
          ...composeAlgoPaymentParams,
          from: account?.accountName,
          to: toAddr,
          amount: parseInt(amount),
        }
      );

      action.flatFee = true;

      const txnBuffer = encodeToUint8Array(action);
      const res = await wallet?.signatureProvider.sign({
        serializedTransaction: txnBuffer,
        requiredKeys: [],
      } as any);
      const signedTransaction = msgpack.decode(
        res?.serializedTransaction as Uint8Array
      );
      const sig = Buffer.from(res?.signatures[0] as string, "hex");

      setState({
        ...state,
        ...payStateObject,
        signedTransaction,
        signature: sig,
      });
    } catch (e) {
      setState({
        ...state,
        ...payStateObject,
      });
      alert(e.message);
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        onInput={(e) => setState({ ...state, toAddr: e.currentTarget.value })}
        placeholder="Receiver Address"
        value={state.toAddr}
      />
      <input
        type="text"
        onInput={(e) => setState({ ...state, amount: e.currentTarget.value })}
        placeholder="Amount in Algos"
        value={state.amount}
      />
      <button disabled={!!state.loading} onClick={() => pay()}>
        {state.loading ? "Loading" : "Pay"}
      </button>
      {
        // state.signedTransaction && state.signature && <Transaction {...state} />
      }
    </div>
  );
});

type TransactionProps = {
  signedTransaction: any;
  signature: Uint8Array;
};

const Transaction: React.FC<TransactionProps> = React.memo(
  ({ signature, signedTransaction }) => {
    return (
      <div>
        <span>{"TxnObject:" + JSON.stringify(signedTransaction)}</span>
        <span>{"signature:" + signature.toString()}</span>
      </div>
    );
  }
);

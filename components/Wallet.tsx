"use client";

import React from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { InjectedConnector } from "@wagmi/connectors/injected";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address,
  });
  const { chain } = useNetwork();
  const {
    chains,
    isLoading: isLoadingChain,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();

  if (!isConnected) {
    return (
      <div
        className="p-2 rounded-xl bg-blue-400 hover:opacity-80"
        onClick={() => connect()}
      >
        <span>Connect Wallet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-evenly w-full">
      <div className="flex items-center">
        <span>
          {isLoadingBalance
            ? "Loading..."
            : `${balance?.value} ${balance?.symbol}`}
        </span>
        <span className="ml-2 mr-2">|</span>
        <span>{address}</span>
      </div>

      <div className="flex items-center">
        {chains.map((item) => (
          <div className="flex items-center ml-3" key={item.id}>
            <div
              className={`w-2 h-2 rounded-full ${
                chain?.name === item.name ? "bg-green-400" : "bg-red-400"
              }`}
            />

            <button
              className="ml-1 hover:opacity-80"
              disabled={!switchNetwork || item.id === chain?.id}
              key={item.id}
              onClick={() => switchNetwork?.(item.id)}
            >
              {item.name}
              {isLoadingChain && pendingChainId === item.id && " (switching)"}
            </button>
          </div>
        ))}
      </div>

      <div
        className="p-2 rounded-xl bg-blue-400 hover:opacity-80"
        onClick={() => disconnect()}
      >
        <span>Disconnect</span>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, goerli } from "@wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import Wallet from "@/components/Wallet";
import TokensPage from "@/components/TokensPage";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <main className="flex min-h-screen flex-col items-center p-24">
        <Wallet />
        <TokensPage />
      </main>
    </WagmiConfig>
  );
}

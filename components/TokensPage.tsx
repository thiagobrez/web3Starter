import React, { useEffect, useState } from "react";
import { Alchemy, Network, Nft } from "alchemy-sdk";
import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

const CRYPTO_PUNKS_ADDRESS = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";

export default function TokensPage() {
  const { isConnected } = useAccount();
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    const getNfts = async () => {
      const { nfts } = await alchemy.nft.getNftsForContract(
        CRYPTO_PUNKS_ADDRESS,
      );

      console.log("nfts", nfts);

      setNfts(nfts);
    };

    getNfts();
  }, []);

  if (!isConnected) return null;

  return (
    <div className="mt-10">
      <h1 className="text-4xl">Tokens</h1>

      <div className="grid grid-cols-5 gap-3 mt-4">
        {nfts.map((nft) => {
          const imageSrc = nft.media[0].thumbnail;

          return (
            <Link
              href={`https://opensea.io/assets/ethereum/${CRYPTO_PUNKS_ADDRESS}/${nft.tokenId}`}
              className="flex flex-col items-center gap-4 border border-gray-400 rounded hover:opacity-80"
              target="_blank"
              key={nft.tokenId}
            >
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={`${nft.title} #${nft.tokenId}`}
                  width={200}
                  height={200}
                />
              )}

              <span>#{nft.tokenId}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

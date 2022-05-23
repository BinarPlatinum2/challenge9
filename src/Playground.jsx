import React, { useEffect, useState } from "react";

const Playground = () => {
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    // 1. Async await
    // async function fetchNft() {
    //   const response = await fetch(
    //     "https://api.opensea.io/api/v1/assets?format=json"
    //   );

    //   const data = await response.json();
    //   setNfts(data.assets);
    // }

    // if (!nfts) {
    //   fetchNft();
    // }

    // 2. Promise
    fetch("https://api.opensea.io/api/v1/assets?format=json")
      .then((response) => response.json())
      .then((data) => !nfts && setNfts(data.assets));

    console.log(nfts);
  }, [nfts]);
  if (!nfts) {
    return null;
  }

  return (
    <div>
      {nfts.map((nft) => (
        <>
          <img src={nft.image_url} />
        </>
      ))}
    </div>
  );
};

export default Playground;

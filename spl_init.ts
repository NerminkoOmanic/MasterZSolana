import { Keypair, Connection } from "@solana/web3.js";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {
       const splTokenModule = await import("@solana/spl-token");
       const { createMint } = splTokenModule;

        const mint = await createMint(connection, keypair, keypair.publicKey, null, 6);
        
        console.log("Mint address: ", mint.toBase58());

    }
    catch (error) {
        console.error(error);
    }
})();
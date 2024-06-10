import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    try {
        const aidropSignature = await connection.requestAirdrop(
            keypair.publicKey,
            5 * LAMPORTS_PER_SOL
        );

        console.log(`Success! Check out your Tx here: https://explorer.solana.com/tx/${aidropSignature}?cluster=devnet`);
    }
    catch (error) {
        console.error(error);
    }
})();

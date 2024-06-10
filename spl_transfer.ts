import { Keypair, Connection, PublicKey } from "@solana/web3.js";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {

        const splTokenModule = await import("@solana/spl-token");
        const { getOrCreateAssociatedTokenAccount, transfer } = splTokenModule;

        const mint = new PublicKey("3DPZstDMyAH2tiSsvqALorWKfNNF6gjeZyCiYqZvKVjt");

        const fromAta = new PublicKey("A4UeC1zFaY62r7URh45HKAF66NzMLpbpFPps9rUztSb5");

        const to = Keypair.generate();

        console.log("To address: ", to.publicKey.toBase58());

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to.publicKey);

        const toAta = tokenAccount.address;
        console.log("Associated token account: ", toAta.toBase58());

        const amount = 10e5;

        await transfer(connection, keypair, fromAta, toAta, keypair, amount);

        console.log("Transferred ", amount, " tokens from ", fromAta.toBase58(), " to ", toAta.toBase58());
    }
    catch (error) {
        console.error(error);
    }
})();
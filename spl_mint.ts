import { Keypair, Connection, PublicKey } from "@solana/web3.js";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {

        const splTokenModule = await import("@solana/spl-token");
        const { mintTo, getOrCreateAssociatedTokenAccount } = splTokenModule;

        const mint = new PublicKey("6ByjebfLVcCSF9yVQnaeF2YocaD54cpXmH7n7uymndm6");

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey);

        const ata = tokenAccount.address;
        console.log("Associated token account: ", ata.toBase58());

        const amount = 10e6;

        await mintTo(connection, keypair, mint, ata, keypair.publicKey, amount);

        console.log("Minted ", amount, " tokens to ", ata.toBase58());
    }
    catch (error) {
        console.error(error);
    }
})();

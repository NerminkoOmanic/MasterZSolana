import { Keypair } from "@solana/web3.js";

// Generate a new keypair
const keypair = Keypair.generate();

console.log("Public key: ", keypair.publicKey.toBase58());
console.log("Private key: ", keypair.secretKey.toString());


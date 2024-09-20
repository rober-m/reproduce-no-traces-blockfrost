import { BlockfrostProvider, MeshWallet, Mint, PlutusScript, Transaction } from "@meshsdk/core";
import { applyCborEncoding } from "@meshsdk/core-csl";
import Blockfrost from '@blockfrost/blockfrost-js';
import fs from 'fs';

const BLOCKFROST_API_KEY = '<YOUR_KEY>'

// Prepare Blockfrost API for blockfrost-js
const API = new Blockfrost.BlockFrostAPI({
  projectId: BLOCKFROST_API_KEY,
  network: 'preprod'
});

// Prepare Blockfrost provider for MeshSDK
const blockchainProvider = new BlockfrostProvider(BLOCKFROST_API_KEY);

// Create a new wallet
//fs.writeFileSync(`wallet.skey`, MeshWallet.brew(true) as string);

// Initialize the wallet with a mnemonic key
const wallet = new MeshWallet({
  networkId: 0,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: 'root',
    bech32: fs.readFileSync(`wallet.skey`).toString().trim()
  },
});

// Check if the wallet has funds
console.log("Wallet address: ", wallet.getChangeAddress());
console.log("Wallet Lovelace balance: ", await wallet.getLovelace());

// Prepare validator
const alwaysFalseVithTracesScript: PlutusScript = {
  code: applyCborEncoding("58980101003232323232253330023232323232533008490117746869732069732061207472616365206d6573736167650015330084911d7468697320697320616e6f74686572207472616365206d6573736167650014a06012601400460100026010004600c00260086ea800452615330034911856616c696461746f722072657475726e65642066616c736500136565734ae7155cf2ba157441"),
  version: "V3",
};

// Prepare dummy asset to mint
const asset: Mint = {
  assetName: 'TestToken',
  assetQuantity: '1',
  metadata: {},
  label: '721',
  recipient: 'addr_test1qrcsu0x34ye9dv5rdcnvzs5fyszf09zfkvr75lqwljlkj3r7cm477qh03xkw55pjta25uvumutk48msee9prpythw0sqev8r56'
};

// Prepare dummy redeemer
const redeemer = {
  data: { alternative: 0, fields: [] },
};

// Create transaction with parameters that I care
const tx = new Transaction({ initiator: wallet })
  .mintAsset(alwaysFalseVithTracesScript, asset, redeemer)
  .setNetwork('preprod')
  .setChangeAddress(wallet.getChangeAddress())

// Balance Tx
const unsignedTx = await tx.build();
// Sign Tx
const signedTx = wallet.signTx(unsignedTx);
// Inspect Tx
console.debug("txJSON: \n", JSON.stringify(tx.txBuilder.meshTxBuilderBody));
// Evaluate Tx with blockfrost-js
console.log("evaluateTx with blockfrost-js: \n", await API.utilsTxsEvaluate(signedTx));
// Submit Tx with blockfrost-js
//console.log("submit tx with blockfrost-js: ", await API.txSubmit(signedTx));

// Evaluate Tx with MeshSDK
//console.log("evaluateTx(): ", JSON.parse(await blockchainProvider.evaluateTx(signedTx)).result);
// Submit Tx with MeshSDK
//const txHash = await wallet.submitTx(signedTx);

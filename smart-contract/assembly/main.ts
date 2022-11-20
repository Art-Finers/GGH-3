import { generateEvent, fileToBase64, createSC, call, Address, transferCoins, Args } from "@massalabs/massa-as-sdk";

function createContract(): Address {
    const bytes = fileToBase64('./build/sample-contract.wasm');
    const sc_address = createSC(bytes);
    transferCoins(sc_address, 50_000_000_000);
    return sc_address;
}

export function main(_args: string): void {
    const sc_address = createContract();
    call(sc_address, "initialize", new Args(), 0);
    generateEvent("Created sample smart-contract at: " + sc_address.toByteString());
    return;
}

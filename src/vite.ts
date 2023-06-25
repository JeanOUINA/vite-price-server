import { Client } from "web3-vite";

export const client = new Client(process.env.VITE_NODE)

// no heartbeat, prevent disconnect
client.subscribe("snapshotBlock")
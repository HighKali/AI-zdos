// Node.js libp2p mesh relay per ZDOS
const Libp2p = require("libp2p");
const { WebSockets } = require("@libp2p/websockets");
const { Mplex } = require("@libp2p/mplex");
const { Noise } = require("@chainsafe/libp2p-noise");
const { createFromJSON } = require("@libp2p/peer-id-factory");
const { GossipSub } = require("@chainsafe/libp2p-gossipsub");

const TOPIC = "zdos-mesh";

async function createNode(peerIdJson) {
  const peerId = await createFromJSON(peerIdJson);
  return await Libp2p.create({
    peerId,
    addresses: { listen: ["/ip4/0.0.0.0/tcp/0/ws"] },
    transports: [new WebSockets()],
    streamMuxers: [new Mplex()],
    connectionEncryption: [new Noise()],
    pubsub: new GossipSub()
  });
}

async function startMesh(peerIdJson) {
  const node = await createNode(peerIdJson);
  await node.start();
  node.pubsub.subscribe(TOPIC, (msg) => {
    const { type, data } = JSON.parse(msg.data.toString());
    // handle "register", "tx", ecc
  });
  return node;
}

module.exports = { startMesh, TOPIC };
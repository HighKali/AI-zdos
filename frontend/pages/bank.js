import { useState } from "react";
import AuthWeb3 from "../components/AuthWeb3";
import MeshStatus from "../components/MeshStatus";
const BANK_URL = "http://localhost:5001/api/bank";

export default function Bank() {
  const [msg, setMsg] = useState("");
  const [sig, setSig] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  async function handleAuth({ address, sig }) {
    setAddress(address);
    setSig(sig);
    const emailProton = prompt("Inserisci la tua email Proton:");
    setEmail(emailProton);
    try {
      const res = await fetch(BANK_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, sig, email: emailProton })
      });
      const data = await res.json();
      setMsg(data.ok ? "Registrazione OK!" : data.error);
    } catch {
      setMsg("Backend offline, uso mesh locale.");
    }
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>🏦 ZDOS Bank</h1>
      <AuthWeb3 onAuth={handleAuth} />
      <MeshStatus address={address} email={email} />
      {msg && <p>{msg}</p>}
      {/* ...area clienti, staking, ecc... */}
    </main>
  );
}
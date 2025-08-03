import { useState } from "react";

export default function UserDashboard() {
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);

  async function registerUser() {
    if (!username) return;
    const res = await fetch("http://localhost:5001/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (data.ok) setRegistered(true);
    else alert(data.error);
  }

  return (
    <section>
      {!registered ? (
        <div>
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button onClick={registerUser}>Registrati</button>
        </div>
      ) : (
        <div>
          <b>Benvenuto, {username}!</b>
        </div>
      )}
    </section>
  );
}
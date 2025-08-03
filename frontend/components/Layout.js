import Link from "next/link";
export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <nav style={{ background: "#222", color: "#fff", padding: 16 }}>
        <Link href="/" style={{ marginRight: 16, color: "#fff" }}>🏠 Home</Link>
        <Link href="/bank" style={{ marginRight: 16, color: "#fff" }}>🏦 Bank</Link>
        <Link href="/music" style={{ marginRight: 16, color: "#fff" }}>🎵 AI Music</Link>
        <Link href="/writing" style={{ marginRight: 16, color: "#fff" }}>📚 AI Writing</Link>
        <span style={{ marginLeft: 16, color: "#aaa" }}>| Futuro: Health, Social, Productivity...</span>
      </nav>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>{children}</main>
    </div>
  );
}
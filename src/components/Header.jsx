import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        navigate(`/?search=${search}`);
      } else {
        navigate(`/`);
      }
    }, 300); // debounce to avoid too many navigations

    return () => clearTimeout(delayDebounce);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <header
      style={{
        padding: "1.2rem",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Link
        to="/"
        style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}
        onClick={() => setSearch("")}
      >
        🏠 Home
      </Link>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888",
            fontSize: "1rem",
          }}
        >
          🔍
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blog..."
          style={{
            padding: "0.5rem 1rem 0.5rem 2.2rem",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
            width: "220px",
            transition: "border-color 0.2s ease",
          }}
        />
      </div>
      <Link
        to="/write"
        style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}
      >
        ✍️ Write Here
      </Link>
    </header>
  );
}

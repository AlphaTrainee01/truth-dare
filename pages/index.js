import { useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(null);
  const [question, setQuestion] = useState("");

  const addPlayer = () => {
    if (input.trim() !== "") {
      setPlayers([...players, input]);
      setInput("");
    }
  };

  const spin = () => {
    if (players.length === 0) return;
    const random = players[Math.floor(Math.random() * players.length)];
    setCurrent(random);
    setQuestion("");
  };

  const getTruth = async () => {
    try {
      const res = await fetch("https://abhi-api.vercel.app/api/game/truth");
      const data = await res.json();
      setQuestion(data.result);
    } catch {
      setQuestion("Error fetching truth 😢");
    }
  };

  const getDare = async () => {
    try {
      const res = await fetch("https://abhi-api.vercel.app/api/game/dare");
      const data = await res.json();
      setQuestion(data.result);
    } catch {
      setQuestion("Error fetching dare 😢");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>

      <h1 style={{ marginBottom: 20 }}>Truth & Dare 🎯</h1>

      {/* Input */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter player name"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "none",
            marginRight: 10
          }}
        />
        <button onClick={addPlayer} style={{
          padding: "10px 15px",
          borderRadius: 8,
          background: "#22c55e",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}>
          Add
        </button>
      </div>

      {/* Circle */}
      <div style={{
        position: "relative",
        width: 300,
        height: 300,
        borderRadius: "50%",
        border: "2px solid #334155",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>

        {/* Players */}
        {players.map((p, i) => {
          const angle = (i / players.length) * 2 * Math.PI;
          const x = 120 * Math.cos(angle);
          const y = 120 * Math.sin(angle);

          return (
            <div key={i} style={{
              position: "absolute",
              transform: `translate(${x}px, ${y}px)`,
              background: current === p ? "#ef4444" : "#1e293b",
              padding: "5px 10px",
              borderRadius: 10,
              fontSize: 12
            }}>
              {p}
            </div>
          );
        })}

        {/* Bottle */}
        <div style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30
        }}>
          🍾
        </div>
      </div>

      {/* Spin */}
      <button onClick={spin} style={{
        marginTop: 20,
        padding: "10px 20px",
        borderRadius: 10,
        background: "#3b82f6",
        border: "none",
        color: "white",
        fontSize: 16,
        cursor: "pointer"
      }}>
        SPIN 🌀
      </button>

      {/* Turn */}
      {current && (
        <div style={{ marginTop: 20 }}>
          <h2>{current}'s Turn</h2>
          <button onClick={getTruth} style={{
            marginRight: 10,
            padding: "8px 15px",
            borderRadius: 8,
            background: "#10b981",
            border: "none",
            cursor: "pointer"
          }}>
            Truth
          </button>
          <button onClick={getDare} style={{
            padding: "8px 15px",
            borderRadius: 8,
            background: "#f59e0b",
            border: "none",
            cursor: "pointer"
          }}>
            Dare
          </button>
        </div>
      )}

      {/* Question */}
      {question && (
        <div style={{
          marginTop: 20,
          padding: 15,
          background: "#1e293b",
          borderRadius: 10,
          maxWidth: 300,
          textAlign: "center"
        }}>
          {question}
        </div>
      )}

      {/* Footer */}
      <div style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        opacity: 0.6
      }}>
        Made by Uddi
      </div>

    </div>
  );
}

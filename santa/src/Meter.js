import React, { useState } from "react";

const Meter = () => {
  const [score, setScore] = useState(0); // Score ranges from -100 (naughty) to 100 (nice)

  const calculateRotation = () => {
    // Map score (-100 to 100) to a rotation angle (-90 to 90)
    return (score / 100) * 90;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "80vh",
        alignContent: 'center'
      }}
    >
      <div
        style={{
          position: "relative",
          width: "600px",
          height: "300px",
          margin: "0 auto",
        }}
      >
        {/* Semi-circle */}
        <svg width="600" height="300" viewBox="0 0 300 150">
          <path
            d="M10,150 A140,140 0 0,1 290,150"
            fill="none"
            stroke="#ccc"
            strokeWidth="10"
          />
          {/* Naughty Section */}
          <path
            d="M10,150 A140,140 0 0,1 150,10"
            fill="none"
            stroke="red"
            strokeWidth="10"
          />
          {/* Nice Section */}
          <path
            d="M150,10 A140,140 0 0,1 290,150"
            fill="none"
            stroke="green"
            strokeWidth="10"
          />
        </svg>
        {/* Needle */}
        <svg
          width="600"
          height="300"
          style={{
            position: "absolute",
            top: "150",
            left: "150",
            transform: `rotate(${calculateRotation()}deg)`,
            transformOrigin: "150px 150px", // Rotate from center-bottom
            transition: "transform 0.5s ease-out",
          }}
        >
          <polygon
            points="150,75 145,150 155,150" // Triangle needle
            fill="black"
          />
        </svg>
      </div>
      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        //   alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{width: '200px', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
          <input
            type="range"
            min="-100"
            max="100"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />
          <p>Score: {score}</p>
        </div>
      </div>
    </div>
  );
};

export default Meter;

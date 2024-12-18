import React, { useState, useRef } from "react";
const nicePhrases = [
  "Keep it up, you're making the world a better place!",
  "Nice! Someone's definitely on Santa's good side.",
  "You're climbing higher on the nice list—great job!",
  "Look at you go! Spreading kindness everywhere.",
  "Wonderful! Santa's going to love this.",
  "You're shining brighter than the North Star!",
  "Way to go! Your good deeds aren't going unnoticed.",
  "Bravo! Kindness suits you so well.",
  "You're making the nice list proud—keep up the good work!",
  "Sweet as candy canes! Keep spreading joy.",
];

const naughtyPhrases = [
  "Uh-oh, looks like coal is on the horizon!",
  "Oh dear, you’re slipping onto the naughty list!",
  "Careful! Santa’s elves are keeping an eye on this.",
  "Yikes, that's not what Santa likes to see.",
  "Hmm, better watch your step—coal is expensive this year!",
  "Oh no! Naughty list vibes detected.",
  "Tsk tsk, time to rethink your choices!",
  "Eek! This isn't how you make Santa happy.",
  "Oh dear, the naughty list just gained a new contender.",
  "Oops, that's a naughty move. Time to turn it around!",
];

const Meter = () => {
  const [score, setScore] = useState(0); // Score ranges from -100 to 100
  const [message, setMessage] = useState(""); // Message to display
  const audioRef = useRef(null);
  const calculateRotation = () => {
    // Map score (-100 to 100) to a rotation angle (-90 to 90)
    return (score / 100) * 90;
  };

  const getRandomPhrase = (phrases) => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };
  // TODO: get sound to work
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const recalculateScore = (e) => {
    const prevScore = score;
    const newScore = Number(e.target.value);
    setScore(newScore);

    if (newScore > prevScore) {
      setMessage(getRandomPhrase(nicePhrases));
      //   TODO: playSound once you get audio to work **Uncommenting below will cause app to break (until audio is properly implemented)
      //
      //   playSound('./public/audio/jinglebells.mp3')
    } else if (newScore < prevScore) {
      setMessage(getRandomPhrase(naughtyPhrases));

      //   TODO: playSound for naughty scenario once audio can work
    } else {
      setMessage("");
    }
  };
  return (
    <div className="meter">
      <div
        className="meterWheel"
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
          <path
            d="M10,150 A140,140 0 0,1 150,10"
            fill="none"
            stroke="#8F002B"
            strokeWidth="10"
          />
          <path
            d="M150,10 A140,140 0 0,1 290,150"
            fill="none"
            stroke="#16302B"
            strokeWidth="10"
          />
          <text
            x="35"
            y="148"
            fill="#F7E2CA"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
          >
            -100
          </text>
          <text
            x="150"
            y="30"
            fill="#F7E2CA"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
          >
            0
          </text>
          <text
            x="270"
            y="148"
            fill="#F7E2CA"
            text-shadow="2px 2px 0px black"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
          >
            100
          </text>
        </svg>
        {/* Needle */}
        <svg
          width="1000"
          height="500"
          style={{
            position: "absolute",
            top: "150",
            left: "150",
            transform: `rotate(${calculateRotation()}deg)`,
            transformOrigin: "150px 150px",
            transition: "transform 0.5s ease-out",
          }}
        >
          <polygon points="150,-30 140,150 160,150" fill="black" />
        </svg>
      </div>
      <div className="scoreDiv">
        <h1 className="score">Score: {score}</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* TODO: delete after connecting web socket as this slider is just meant to show what happens when the score changes. */}
          {/* Slider Input  */}
          <input
            type="range"
            min="-100"
            max="100"
            value={score}
            onChange={(e) => recalculateScore(e)}
          />
        </div>
        {/* Display Message */}
        <div className="outputTextDiv">
          {message && <h3 className="outputText">{message}</h3>}
        </div>
      </div>
    </div>
  );
};

export default Meter;

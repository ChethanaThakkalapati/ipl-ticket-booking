import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
  const [selectedTeam, setSelectedTeam] = useState("All");

  const matches = [
    {
      id: 1,
      teams: "RCB vs CSK",
      date: "10 April 2026, 7:30 PM",
      venue: "Bengaluru",
      general: 1000,
      premium: 2500,
      vip: 5000,
    },
    {
      id: 2,
      teams: "MI vs CSK",
      date: "12 April 2026, 7:30 PM",
      venue: "Mumbai",
      general: 1200,
      premium: 3000,
      vip: 6000,
    },
    {
      id: 3,
      teams: "RCB vs MI",
      date: "15 April 2026, 7:30 PM",
      venue: "Bengaluru",
      general: 1500,
      premium: 3000,
      vip: 5500,
    },
  ];

  const filteredMatches =
    selectedTeam === "All"
      ? matches
      : matches.filter((match) => match.teams.includes(selectedTeam));

  return (
    <>
      <Navbar />
      <Hero />

      <section className="matches">
        <h2>Upcoming IPL Matches</h2>

        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="All">All Teams</option>
          <option value="RCB">RCB</option>
          <option value="CSK">CSK</option>
          <option value="MI">MI</option>
        </select>

        <div className="match-container">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
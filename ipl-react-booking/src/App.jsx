import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);
  useEffect(() => {
  const channel = supabase
    .channel("matches-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "matches",
      },
      (payload) => {
        console.log("Database changed:", payload);
        fetchMatches();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  async function fetchMatches() {
  const { data, error } = await supabase
    .from("matches")
    .select("*");

  if (error) {
    console.error("Error fetching matches:", error.message);
  } else {
    setMatches(data);
  }

  setLoading(false);
}

  const filteredMatches =
    selectedTeam === "All"
      ? matches
      : matches.filter(
          (match) =>
            match.team1 === selectedTeam ||
            match.team2 === selectedTeam
        );

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
          <option value="CSK">CSK</option>
          <option value="MI">MI</option>
          <option value="RCB">RCB</option>
          <option value="KKR">KKR</option>
          <option value="GT">GT</option>
          <option value="RR">RR</option>
          <option value="SRH">SRH</option>
          <option value="DC">DC</option>
          <option value="LSG">LSG</option>
          <option value="PBKS">PBKS</option>
        </select>

        {loading ? (
          <p>Loading matches...</p>
        ) : (
          <div className="match-container">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}

      </section>
    </>
  );
}

export default App;
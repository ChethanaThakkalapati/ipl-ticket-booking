function MatchCard({ match }) {
  return (
    <div className="match-card">
      <h3>{match.teams}</h3>

      <p>📅 {match.date}</p>

      <p>📍 {match.venue}</p>

      <p>General: ₹{match.general}</p>

      <p>Premium: ₹{match.premium}</p>

      <p>VIP: ₹{match.vip}</p>

      <button>Book Now</button>
    </div>
  );
}

export default MatchCard;
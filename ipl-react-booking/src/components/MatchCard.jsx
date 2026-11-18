import { supabase } from "../supabase";

function MatchCard({ match }) {

  async function bookTicket() {
    const userName = prompt("Enter your name:");

    if (!userName || !userName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const tickets = Number(prompt("Enter number of tickets:"));

    if (!Number.isInteger(tickets) || tickets < 1 || tickets > 10) {
      alert("Please enter between 1 and 10 tickets.");
      return;
    }

    if (tickets > match.available_seats) {
      alert("Not enough seats available!");
      return;
    }

    const totalPrice = tickets * match.price;

    // Insert booking into Supabase
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          match_id: match.id,
          user_name: userName.trim(),
          match_title: `${match.team1} vs ${match.team2}`,
          tickets: tickets,
          total_price: totalPrice,
        },
      ]);

    if (bookingError) {
      alert("Booking failed: " + bookingError.message);
      return;
    }

    // Update available seats
    const { error: updateError } = await supabase
      .from("matches")
      .update({
        available_seats: match.available_seats - tickets,
      })
      .eq("id", match.id);

    if (updateError) {
      alert("Booking saved, but seat update failed: " + updateError.message);
      return;
    }

    alert("Ticket booked successfully!");

    window.location.reload();
  }

  return (
    <div className="match-card">
      <h3>{match.team1} vs {match.team2}</h3>

      <p>📅 {match.date}</p>

      <p>📍 {match.venue}</p>

      <p>Ticket Price: ₹{match.price}</p>

      <p>Available Seats: {match.available_seats}</p>

      <button onClick={bookTicket}>
        Book Now
      </button>
    </div>
  );
}

export default MatchCard;
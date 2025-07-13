import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TicketDetails from './TicketDetails';

const ClaimedTickets = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
      axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/claimed`)
          .then((res) => setTickets(res.data.data))
          .catch((err) => {
              console.error('Error fetching claimed tickets:', err.message);
          });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Claimed Tickets</h1>
      {tickets.length === 0 ? (
        <p>No claimed tickets.</p>
      ) : (
        <div className="row">
          {tickets.map((ticket) => (
            <div className="col-md-6 col-lg-4 mb-4" key={ticket._id}>
              <TicketDetails ticket={ticket} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ClaimedTickets;

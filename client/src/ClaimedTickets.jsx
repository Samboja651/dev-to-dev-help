import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TicketDetails from './TicketDetails';

const ClaimedTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/claimed`)
            .then((res) => setTickets(res.data))
            .catch((err) => {
                console.error('Error fetching claimed tickets:', err.message);
            });
    }, []);

  return (
    <div>
      <h1>Claimed Tickets</h1>
      {tickets.length === 0 ? (
        <p>No claimed tickets at the moment.</p>
      ) : (
        tickets.map((ticket) => (
          <TicketDetails key={ticket._id} ticket={ticket} />
        ))
      )}
    </div>
  );
};
export default ClaimedTickets;

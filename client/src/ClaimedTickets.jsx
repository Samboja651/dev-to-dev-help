import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketDetails from './TicketDetails';

const ClaimedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/claimed`)
      .then((res) => setTickets(res.data.data))
      .catch((err) => {
        console.error('Error fetching claimed tickets:', err.message);
      });
  }, []);

  const handleRemoveTicket = (id) => {
    setTickets(prev => prev.filter(t => t._id !== id));
  };

  const handleFeedback = (msg, type) => {
    setAlertMsg(msg);
    setAlertType(type);

    setTimeout(() => {
      setAlertMsg('');
      setAlertType('');
    }, 5000); // 5s toast duration
  };


  return (
    <div className="container mt-4">
      <h1>Claimed Tickets</h1>

      {alertMsg && (
        <div className={`alert alert-${alertType} toast-timer`} role="alert">
          {alertMsg}
        </div>
      )}

      {tickets.length === 0 ? (
        <p>No claimed tickets.</p>
      ) : (
        <div className="row">
          {tickets.map((ticket) => (
            <div className="col-md-6 col-lg-4 mb-4" key={ticket._id}>
              <TicketDetails
                ticket={ticket}
                onFeedback={handleFeedback}
                onRemove={handleRemoveTicket}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ClaimedTickets;

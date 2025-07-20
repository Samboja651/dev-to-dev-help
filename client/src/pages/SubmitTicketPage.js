import React from 'react';
import TicketForm from '../components/TicketForm';

export default function SubmitTicketPage() {
  return (
    <div className="card p-4 shadow-sm">
      <TicketForm userId="demo-user" /> {/* placeholder for now */}
    </div>
  );
}

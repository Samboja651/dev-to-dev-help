import React from "react";
import OpenTickets from "./OpenTickets";
import ClaimedTickets from "./ClaimedTickets";
import ResolvedTickets from "./ResolvedTickets";

function App() {
  return (
    <div className="App">
      {/* <h2>Open Tickets</h2> */}
      <OpenTickets />
      <hr />
      {/* <h2>Claimed Tickets</h2> */}
      <ClaimedTickets />
      <hr />
      {/* <h2>Resolved Tickets</h2> */}
      <ResolvedTickets />
    </div>
  );
}

export default App;
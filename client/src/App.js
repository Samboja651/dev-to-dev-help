import React from "react";
import OpenTickets from "./OpenTickets";
import ClaimedTickets from "./ClaimedTickets";

function App() {
  return (
    <div className="App">
      {/* <h2>Open Tickets</h2> */}
      <OpenTickets />
      <hr />
      {/* <h2>Claimed Tickets</h2> */}
      <ClaimedTickets />
    </div>
  );
}

export default App;
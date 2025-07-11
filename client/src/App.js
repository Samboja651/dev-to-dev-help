import React from "react";
import TicketDetails from "./TicketDetails";

function App() {
  const sampleTicket = {
    title: "Expo build failing",
    description: "Need help resolving unknown error during EAS build.",
    tags: ["Expo", "Android", "eas-cli"],
    urgency: "high",
    status: "resolved",
    claimedBy: "helper-dev-22",
    solutionDoc: "## Fix Steps\n1. Reinstalled `eas-cli`\n2. Cleared cache\n3. Verified config",
    meetLink: "https://meet.google.com/xyz-def-123"
  };

  return (
    <div className="App">
      <TicketDetails ticket={sampleTicket} />
    </div>
  );
}
export default App;
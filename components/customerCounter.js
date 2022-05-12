import React from "react";

const CustomerCounter = ({ counter }) => {
  let currentTicketNum = counter.currentTicket;
  let counterNum = counter.number;
  let online = counter.isOnline;

  const cardColor = online ? "yellow-card" : "gray-card";
  const statusColor = online
    ? currentTicketNum
      ? "red-status"
      : "green-status"
    : "gray-status";

  return (
    <div className={`customer-counter-card ${cardColor} }`}>
      <div className="customer-counter-header">
        <div>Counter {counterNum}</div>
        <button className={`status-btn ${statusColor} `}></button>
      </div>
      {online ? <div>{currentTicketNum}</div> : <div>Offline</div>}
    </div>
  );
};

export default CustomerCounter;

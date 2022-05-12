import React from "react";

const CustomerCounter = ({ counter }) => {
  let currentTicketNum = counter.currentTicket;
  let counterNum = counter.number;
  let online = counter.isOnline;

  const cardColor = online ? "yellow-card" : "gray-card";
  const btnColor = online
    ? currentTicketNum
      ? "red-btn"
      : "green-btn"
    : "gray-btn";

  return (
    <div className={`customer-counter-card ${cardColor} }`}>
      <div className="customer-counter-header">
        <div>Counter {counterNum}</div>
        <button className={`serving-btn ${btnColor} `}></button>
      </div>
      {online ? <div>{currentTicketNum}</div> : <div>Offline</div>}
    </div>
  );
};

export default CustomerCounter;

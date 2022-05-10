import React from "react";

const CustomerCounter = () => {
  const currentTicketNum = "0072";
  const counterNum = 0;

  return (
    <div className="customer-counter-card">
      <div className="customer-counter-header">
        <div>Counter {counterNum}</div>
        <button className="serving-btn green-btn"></button>
      </div>
      <div>{currentTicketNum}</div>
    </div>
  );
};

export default CustomerCounter;

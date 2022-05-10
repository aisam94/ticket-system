import React from "react";

const CounterCard = () => {
  const counterNum = 0;

  return (
    <div className="counter-card">
      <div>Counter {counterNum}</div>
      <button>Go Offline</button>
      <button>Complete Current</button>
      <button>Call Next</button>
    </div>
  );
};

export default CounterCard;

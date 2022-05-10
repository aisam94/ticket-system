import React from "react";
import CounterCard from "../components/counterCard";
import { COUNTER_NUM } from "../constants/numbers";

const CounterMgmt = () => {
  return (
    <main>
      <h1>COUNTER MANAGEMENT</h1>
      <div className="counter-container">
        {[...Array(COUNTER_NUM)].map((value, index) => {
          return <CounterCard key={index} />;
        })}
      </div>
    </main>
  );
};

export default CounterMgmt;

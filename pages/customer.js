import React from "react";
import CustomerCounter from "../components/customerCounter";
import { COUNTER_NUM } from "../constants/numbers";

const CustomerView = () => {
  const latestServingNum = 0;
  const latestIssuedNum = 0;

  return (
    <main>
      <h1>CUSTOMER VIEW</h1>
      <div className="customer-status-container">
        <div>Now Serving: {latestServingNum}</div>
        <div>Last Number: {latestIssuedNum}</div>
        <button>Take a Number</button>
      </div>
      <div className="customer-counter-container">
        {[...Array(COUNTER_NUM)].map((value, index) => {
          return <CustomerCounter key="index" />;
        })}
      </div>
    </main>
  );
};

export default CustomerView;

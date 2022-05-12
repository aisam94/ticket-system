import React from "react";
import CounterCard from "../components/counterCard";

import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";

const CounterMgmt = () => {
  //get ticket list queue
  const queueRef = doc(db, "ticket", "queue");
  const [ticketSnapshot] = useDocument(queueRef);
  const ticketData = ticketSnapshot ? ticketSnapshot.data() : [];
  const ticketArr = ticketData.queue;

  //counter ref
  const counterRef = doc(db, "ticket", "counter");
  const [counterSnapshot] = useDocument(counterRef);
  const counterData = counterSnapshot ? counterSnapshot.data() : [];

  return (
    <main>
      <h1>COUNTER MANAGEMENT</h1>
      {ticketArr && ticketArr.length === 0 && (
        <div> No tickets in the waiting queue</div>
      )}
      <div className="counter-container">
        {counterData?.counters?.map((counter, index) => {
          return <CounterCard key={index} counter={counter} />;
        })}
      </div>
    </main>
  );
};

export default CounterMgmt;

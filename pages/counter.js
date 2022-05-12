import React from "react";
import CounterCard from "../components/counterCard";

import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";

const CounterMgmt = () => {
  //queue ref
  const queueRef = doc(db, "ticket", "queue");
  const [queueSnapshot] = useDocument(queueRef);
  const queueData = queueSnapshot ? queueSnapshot.data() : [];
  const queueArr = queueData.queue;

  //counter ref
  const counterRef = doc(db, "ticket", "counter");
  const [counterSnapshot] = useDocument(counterRef);
  const counterData = counterSnapshot ? counterSnapshot.data() : [];

  return (
    <main>
      <h1 className="title">COUNTER MANAGEMENT</h1>
      {queueArr && queueArr.length === 0 && (
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

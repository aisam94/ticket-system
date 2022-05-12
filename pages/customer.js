import React, { useEffect } from "react";
import CustomerCounter from "../components/customerCounter";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "nanoid";
import { useDocument } from "react-firebase-hooks/firestore";

const CustomerView = () => {
  //get ticket list queue
  const queueRef = doc(db, "ticket", "queue");
  const [ticketSnapshot] = useDocument(queueRef);
  const ticketData = ticketSnapshot ? ticketSnapshot.data() : [];
  const ticketArr = ticketData.queue;

  //counter ref
  const counterRef = doc(db, "ticket", "counter");
  const [counterSnapshot] = useDocument(counterRef);
  const counterData = counterSnapshot ? counterSnapshot.data() : [];
  // const counterArr = counterData.counters;

  //get current ticket count
  let currentCount;
  const countRef = doc(db, "ticket", "count");
  const [countSnapshot] = useDocument(countRef);
  currentCount = countSnapshot ? countSnapshot.data().count : 1;

  //serving queue
  const servingRef = doc(db, "ticket", "serving");
  const [servingSnapshot] = useDocument(servingRef);
  const servingData = servingSnapshot ? servingSnapshot.data() : [];
  const servingArr = servingData.counter;

  //new ticket
  const newTicket = {
    id: nanoid(),
    ticketNumber: currentCount,
    isCompleted: false,
    isServing: false,
    isWaiting: true,
  };

  const addTicket = () => {
    setDoc(queueRef, { queue: [...ticketArr, newTicket] }, { merge: true });
    setDoc(countRef, { count: currentCount + 1 }, { merge: true });
  };

  const latestServingNum = () => {
    if (servingArr && servingArr.length !== 0) {
      return servingArr[servingArr.length - 1].ticketNumber;
    }
    return "";
  };

  let latestIssuedNum = currentCount - 1;

  return (
    <main>
      <h1>CUSTOMER VIEW</h1>

      <div className="customer-status-container">
        <div>Now Serving: {latestServingNum()}</div>
        <div>Last Number: {latestIssuedNum}</div>
        <button onClick={addTicket}>Take a Number</button>
      </div>

      <div className="customer-counter-container">
        {counterData?.counters?.map((counter, index) => {
          return <CustomerCounter key={index} counter={counter} />;
        })}
      </div>
    </main>
  );
};

export default CustomerView;

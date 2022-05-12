import React from "react";
import CustomerCounter from "../components/customerCounter";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "nanoid";
import { useDocument } from "react-firebase-hooks/firestore";

const CustomerView = () => {
  //queue ref
  const queueRef = doc(db, "ticket", "queue");
  const [queueSnapshot] = useDocument(queueRef);
  const queueData = queueSnapshot ? queueSnapshot.data() : [];
  const queueArr = queueData.queue;

  //counter ref
  const counterRef = doc(db, "ticket", "counter");
  const [counterSnapshot] = useDocument(counterRef);
  const counterData = counterSnapshot ? counterSnapshot.data() : [];

  //ticket count ref
  const countRef = doc(db, "ticket", "count");
  const [countSnapshot] = useDocument(countRef);
  let currentCount = countSnapshot ? countSnapshot.data().count : 1;

  //serving ref
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
    setDoc(queueRef, { queue: [...queueArr, newTicket] }, { merge: true });
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
      <h1 className="title">CUSTOMER VIEW</h1>
      <div className="customer-status-container">
        <div>Now Serving: {latestServingNum()}</div>
        <div>Last Number: {latestIssuedNum}</div>
        <button className="btn" onClick={addTicket}>
          Take a Number
        </button>
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

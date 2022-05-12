import React, { useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";

const CounterCard = ({ counter }) => {
  //counter ref
  const counterRef = doc(db, "ticket", "counter");
  const [counterSnapshot] = useDocument(counterRef);
  const counterData = counterSnapshot ? counterSnapshot.data() : [];
  const counterArr = counterData.counters;

  //queue ref
  const queueRef = doc(db, "ticket", "queue");
  const [queueSnapshot] = useDocument(queueRef);
  const queueData = queueSnapshot ? queueSnapshot.data() : [];
  const queueArr = queueData.queue;

  //serving ref
  const servingRef = doc(db, "ticket", "serving");
  const [servingSnapshot] = useDocument(servingRef);
  const servingData = servingSnapshot ? servingSnapshot.data() : [];
  const servingArr = servingData.counter;

  //online status
  const [isOnline, setIsOnline] = useState(counter.isOnline);
  const toggleOnline = () => {
    setIsOnline(!isOnline);
    const newCounters = counterArr.map((obj) => {
      if (obj.number === counter.number) {
        return { ...obj, isOnline: !counter.isOnline };
      }
      return obj;
    });
    setDoc(counterRef, { counters: newCounters }, { merge: true });
  };

  //call next
  const callNext = () => {
    //only call if online, queue not empty, and not serving anyone
    if (
      counter.isOnline &&
      queueArr.length > 0 &&
      counter.currentTicket === null
    ) {
      queueArr[0].isServing = true;
      queueArr[0].isWaiting = false;

      //take the next ticket in queue to counter
      const newCounters = counterData.counters.map((obj) => {
        if (obj.number === counter.number) {
          return { ...obj, currentTicket: queueArr[0].ticketNumber };
        }
        return obj;
      });
      setDoc(counterRef, { counters: newCounters });

      //remove ticket from queue and add to serving
      setDoc(servingRef, { counter: [...servingData.counter, queueArr[0]] });
      const newTicketArr = queueArr.slice(1);
      setDoc(queueRef, { queue: newTicketArr });
    }
  };

  //complete current
  const completeCurrent = () => {
    //access current counter
    const currentCounter = counterArr.find(
      (obj) => obj.number === counter.number
    );

    //adjust serving array
    const newCounterArr = servingArr.filter((obj) => {
      return obj.ticketNumber !== currentCounter.currentTicket;
    });
    setDoc(servingRef, { counter: newCounterArr });

    //adjust counter current ticket to null
    const newCounters = counterData.counters.map((obj) => {
      if (obj.number === counter.number) {
        return { ...obj, currentTicket: null };
      }
      return obj;
    });
    setDoc(counterRef, { counters: newCounters }, { merge: true });
  };

  return (
    <div className="counter-card">
      <div>Counter {counter.number}</div>
      {isOnline ? (
        <button className="btn" onClick={toggleOnline}>
          {" "}
          Go Offline
        </button>
      ) : (
        <button className="btn" onClick={toggleOnline}>
          Go Online
        </button>
      )}
      <button className="btn" onClick={completeCurrent}>
        Complete Current
      </button>
      <button className="btn" onClick={callNext}>
        Call Next
      </button>
    </div>
  );
};

export default CounterCard;

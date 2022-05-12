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

  //get ticket list queue
  const queueRef = doc(db, "ticket", "queue");
  const [ticketSnapshot] = useDocument(queueRef);
  const ticketData = ticketSnapshot ? ticketSnapshot.data() : [];
  const ticketArr = ticketData.queue;

  //serving queue
  const servingRef = doc(db, "ticket", "serving");
  const [servingSnapshot] = useDocument(servingRef);
  const servingData = servingSnapshot ? servingSnapshot.data() : [];
  const servingArr = servingData.counter;

  //online status
  const [isOnline, setIsOnline] = useState(counter.isOnline);
  const toggleOnline = () => {
    setIsOnline(!isOnline);

    // counter.isOnline = isOnline;
    const newCounters = counterData.counters.map((obj) => {
      if (obj.number === counter.number) {
        return { ...obj, isOnline: !counter.isOnline };
      }
      return obj;
    });
    setDoc(counterRef, { counters: newCounters }, { merge: true });
  };

  //call next function
  const callNext = () => {
    if (
      counter.isOnline &&
      ticketArr.length > 0 &&
      counter.currentTicket === null
    ) {
      ticketArr[0].isServing = true;
      ticketArr[0].isWaiting = false;

      const newCounters = counterData.counters.map((obj) => {
        if (obj.number === counter.number) {
          return { ...obj, currentTicket: ticketArr[0].ticketNumber };
        }
        return obj;
      });
      setDoc(counterRef, { counters: newCounters });

      //remove from queue and add to serving
      setDoc(servingRef, { counter: [...servingData.counter, ticketArr[0]] });
      const newTicketArr = ticketArr.slice(1);
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
        <button onClick={toggleOnline}> Go Offline</button>
      ) : (
        <button onClick={toggleOnline}>Go Online</button>
      )}
      <button onClick={completeCurrent}>Complete Current</button>
      <button onClick={callNext}>Call Next</button>
    </div>
  );
};

export default CounterCard;

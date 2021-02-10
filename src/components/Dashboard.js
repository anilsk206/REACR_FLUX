import React, {useState } from 'react'


export const Dashboard = () => {

    const [transID, settransID] = useState(0);
    const [transDetails, settransDetails] = useState(0);

    let eventSource = undefined;


    const submitHandler = event => {
      event.preventDefault();
        eventSource = new EventSource("http://localhost:8080/event/resources/usage/"+transID);
        eventSource.onmessage = (event) => {
            const usage = JSON.parse(event.data);
            settransDetails(usage.memoryUsage)
        }
        eventSource.onerror = (err) => {
            console.error("EventSource faild:", err);
            eventSource.close();
        }
    
    return () => {
            eventSource.close();
            console.log("event closed")
    }

    };

    
    return (
      <section>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="title">TranscriptionID</label>
          <input
            type="text"
            id="id"
            value={transID}
            onChange={event => {
              settransID(event.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="data">TranscriptionData</label>
          <input
            type="text"
            id="details"
            value={transDetails}
            onChange={event => {
              settransDetails(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Get Data</button>
        </div>
      </form>
  </section>
    )
}

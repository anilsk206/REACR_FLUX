import React, {useState } from 'react'


export const Dashboard = () => {

    const [transID, settransID] = useState(0);
    const [transDetails, settransDetails] = useState(0);

    let eventSource = undefined;


    const submitHandler = event => {
      event.preventDefault();
        eventSource = new EventSource("http://localhost:8081/event/getInsights/"+transID);
        eventSource.onmessage = (event) => {
            const insights = event.data;
            console.log("data........."+insights)
            settransDetails(insights)
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
        <div className="form-control" style={{
          display: "flex",
          justifyContent: "center",
          allignItems: "center"
        }}>
          <label htmlFor="title" style={{marginRight:"20px",marginTop: "20px",marginBottom:"20px"}}>UCID</label>
          <input
            type="text"
            id="id"
            style={{marginRight:"20px",marginTop:"20px",marginBottom:"20px"}}
            value={transID}
            onChange={event => {
              settransID(event.target.value);
            }}
          />
          <button type="submit" style={{marginRight:"20px",marginTop:"20px",marginBottom:"20px"}}>Get Insights</button>
        </div>
        <div className="form-control" style={{
          display:"flex",
          justifyContent:"center",
          allignItems: "center"
        }}>
          <label htmlFor="data" style={{marginRight:"20px",marginTop:"20px",marginBottom:"20px"}}>Insights</label>
          <textarea
            style={{marginRight:"20px",marginTop:"20px",marginBottom:"20px"}}
            value={transDetails}
            onChange={event => {
              settransDetails(event.target.value);
            }}
            rows={5}
            cols={50}
          />
        </div>
      </form>
  </section>
    )
}

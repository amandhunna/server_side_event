import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Establish SSE connection
    const eventSource = new EventSource('http://localhost:5000/events');

    eventSource.onmessage = function (event) {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, newData]);
    };

    eventSource.onerror = function () {
      console.error('SSE connection error');
      eventSource.close();
    };

    return () => eventSource.close(); // Clean up on component unmount
  }, []);

  const addData = async () => {
    try {
      await axios.post('http://localhost:5000/add-data', { message });
      setMessage(''); // Clear input field after sending
    } catch (error) {
      console.error('Error adding data', error);
    }
  };

  return (
    <div className="App">
      <h1 className="paper">Server-Sent Events</h1>
      <div className="paper">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={addData}>Send Message</button>
      </div>
      <div className="paper">
        <div>
          <h2>Real-time Updates</h2>
          <ol>
            {data.map((item, index) => (
              <li key={index}>{item.message}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;

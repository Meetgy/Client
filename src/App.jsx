import { useEffect, useRef, useState } from "react";
import Chat from "./components/Chat";
import { Route, Routes } from "react-router-dom";

function App() {
  const [socket, setSocket] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;
  const retryTimeout = useRef(null);
  const [wsError, setWsError] = useState(false);

  useEffect(() => {
    const userId = window.localStorage.getItem("biscut");
    const connectWebSocket = () => {
      const socket = new WebSocket(`ws://localhost:8000/chat?userId=${userId}`);

      socket.onopen = () => {
        console.log("Connected");
        setSocket(socket);
        setRetryCount(0); // Reset retry count on successful connection
      };

      socket.onmessage = (msg) => {
        const parsedMessage = JSON.parse(msg?.data);
        if (parsedMessage) {
          setMsgs(pervMsg => [...pervMsg, parsedMessage]);
        }
      };

      socket.onerror = (error) => {
        setWsError(true);
        console.log(error)
      };

      socket.onclose = () => {
        if (retryCount < maxRetries) {
          const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Exponential backoff, max 30 seconds
          console.log(`WebSocket disconnected retry in ${retryDelay / 1000} seconds...`);
          retryTimeout.current = setTimeout(() => {
            setRetryCount(pervCount => pervCount + 1);
            connectWebSocket(); // Retry connection (Recursion)
          }, retryDelay);
        } else {
          console.log("Max retries reached, could not connect to WebSocket.");
        }
      };
    };

    connectWebSocket(); // Initial connection attempt

    return () => {
      if (socket) {
        socket.close();
        console.log("WebSocket connection closed");
      }
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current); // Clear any pending retries on unmount
      }
    };
  }, [retryCount]); // Reconnect on retry count change

  if (!socket && wsError) {
    return (
      <d className="bg-[#212121] w-screen h-screen flex flex-col justify-center items-center text-white">
        {`We're`} having trouble connecting right now. Please check your internet connection and try again later
      </d>
    );
  }

  return (
    <div className="bg-[#09090b] w-screen h-screen flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={wsError || <Chat socket={socket} msgs={msgs} />} />
      </Routes>
    </div>
  );
}

export default App;

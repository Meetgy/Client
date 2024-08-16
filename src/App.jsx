import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import { Route, Routes } from "react-router-dom";
import useWebSocket from "./hooks/useWebSocket.js"; // New custom hook

const App = () => {
  const [msgs, setMsgs] = useState([]);
  const userId = window.localStorage.getItem("biscut");
  const { socket, error } = useWebSocket(`ws://localhost:8000/chat?userId=${userId}`);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (msg) => {
        const parsedMessage = JSON.parse(msg?.data);
        if (parsedMessage) {
          setMsgs(prevMsg => [...prevMsg, parsedMessage]);
        }
      };
    }
  }, [socket]);

  if (error) {
    return (
      <div className="bg-[#212121] w-screen h-screen flex flex-col justify-center items-center text-white">
        {`We're`} having trouble connecting right now. Please check your internet connection and try again later
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] w-screen h-screen flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={error || <Chat socket={socket} msgs={msgs} />} />
      </Routes>
    </div>
  );
}

export default App;
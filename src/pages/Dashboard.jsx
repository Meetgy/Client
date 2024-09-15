import { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket.js"; 
import { useFetchUsersQuery } from "../store/index.js";
import Connections from "../components/Connections.jsx";
import Route from "../components/utils/Route.jsx";
import Chat from "../components/Chat";

const Dashboard = () => {
  const [msgs, setMsgs] = useState([]);
  const [connection, setConnection] = useState('');

  const userId = window.localStorage.getItem("biscut");

  const { socket, error } = useWebSocket(`ws://localhost:8000/chat?userId=${userId}`);

  const { data, isError, isSuccess } = useFetchUsersQuery();

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

  const handleConnection = (user) => {
    setConnection(user)
  }

  let users;
  if (!isError && isSuccess) {
    users = <Connections data={data} handleConnection={handleConnection} />
  }
  if (error) {
    return (
      <div className="bg-[#212121] w-screen h-screen flex flex-col justify-center items-center text-white">
        {`We're`} having trouble connecting right now. Please check your internet connection and try again later
      </div>
    );
  }
  return (
    <div className="flex flex-row">
      {users}
      {/* <Route path={`/${connection._id}`}> */}
        <Chat socket={socket} msgs={msgs} receiver={connection} />
      {/* </Route> */}
    </div>
  )
}

export default Dashboard;
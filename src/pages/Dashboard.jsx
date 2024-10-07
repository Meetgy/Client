import { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket.js";
import { useFetchUsersQuery } from "../store/index.js";
import Connections from "../components/Connections.jsx";
import Chat from "../components/Chat";
import ChatInput from "../components/ChatInput.jsx";
import Route from "../components/utils/Route.jsx";
import HorizontalBar from "../components/styling_Comps/HorizontalBar"
import { MdKeyboardArrowLeft } from "react-icons/md";

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
    <div className="bg-zinc-950 w-full h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <HorizontalBar />
      </div>
      <div className="flex flex-row justify-between flex-grow overflow-hidden">
        {users}
        <div className="bg-zinc-800 h-full w-3"></div>
        <div className="flex flex-col justify-between w-full overflow-hidden">
          <div className="text-gray-100 text-lg flex flex-row items-center bg-[#1a1a1d] h-12 py-3 sticky top-0 z-10">
            <div className="flex flex-row gap-2 items-center text-violet-500 px-4 text-lg"><MdKeyboardArrowLeft className="text-2xl" />{connection.name}</div>
          </div>
          <Route path={`/dashboard/${connection._id}`}>
            <Chat socket={socket} msgs={msgs} />
          </Route>
          <ChatInput socket={socket} receiver_id={connection._id} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
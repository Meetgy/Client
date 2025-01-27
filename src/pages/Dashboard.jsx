import { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket.js";
import { addMessages } from "../store/index.js";
import Connections from "../components/Connections.jsx";
import ChatInput from "../components/ChatInput.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import Route from "../components/utils/Route.jsx";
import HorizontalBar from "../components/styling_Comps/HorizontalBar"
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useConnections } from "../hooks/useConnections.js";

const Dashboard = () => {
  const [connection, setConnection] = useState('');

  const userId = useSelector(state => state.auth.userId);

  const msgs = useSelector(state => state.messagesSlice.messages);
  const dispatch = useDispatch();

  const { socket, error } = useWebSocket(`ws://localhost:8000/chat?userId=${userId}`);

  const { connections, isError, isSuccess } = useConnections();

  useEffect(() => {
    if (socket) {
      socket.onmessage = (msg) => {
        const parsedMessage = JSON.parse(msg?.data);
        if (parsedMessage) {
          dispatch(addMessages(parsedMessage));
          console.log(msgs)
        }
      };
    }
  }, [socket, msgs]);

  const handleConnection = (user) => {
    setConnection(user)
  }

  let users;
  if (!isError && isSuccess) {
    users = <Connections data={connections} handleConnection={handleConnection} />
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
          <Route path={`/dashboard/chat/${connection._id}`}>
            <ChatWindow msgs={msgs} />
          </Route>
          <ChatInput socket={socket} receiver_id={connection._id} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
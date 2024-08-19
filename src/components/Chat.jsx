import { useState } from "react";
import { TiMessageTyping } from "react-icons/ti";

const Chat = ({ socket, msgs, receiver }) => {
    const [newMsg, setNewMsg] = useState("");

    const handleSendMSG = () => {
        if (newMsg != "") {
            if (receiver) {
                const data = JSON.stringify({
                    content: newMsg,
                    sender_id: window.localStorage.getItem("biscut"),
                    receiver_id: receiver._id,
                    state: "pending",
                });
                socket.send(data);
                setNewMsg("");
            } else {
                alert("Select a User to send Msg")
            }
        }
    };

    const content = msgs?.map((msg, i) => {
        return (
            <div key={i} className="text-white flex flex-row items-center">
                {msg?.message?.content} - {msg?.message?.state}
            </div>
        );
    });

    return (
        <div className="flex flex-row items-center m-1">
            <div className="text-gray-100 text-base gap-1 flex flex-row items-center">
                <TiMessageTyping className="text-xl" />
                {receiver?.name}
            </div>
            {content}
            <input
                className="w-48 px-1 text-base m-2 bg-gray-100 rounded-md"
                type="text"
                onChange={(e) => setNewMsg(e.target.value)}
                value={newMsg}
                placeholder="Send Msg..."
            />
            <button
                className="px-2 bg-gray-300 text-base text-black rounded-md"
                onClick={handleSendMSG}
            >
                Send
            </button>
        </div>
    )
}

export default Chat;
import { useState } from "react";

const ChatInput = ({ socket, receiver}) => {
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

    return (
        <div>
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

export default ChatInput

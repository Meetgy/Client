import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatInput = ({ socket, receiver}) => {
    const [newMsg, setNewMsg] = useState("");
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key === "Enter"){
                buttonRef.current.click();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    },[])

    const handleSendMSG = () => {
        if (newMsg != "") {
            if (receiver && window.localStorage.getItem("biscut") != undefined) {
                const data = JSON.stringify({
                    content: newMsg,
                    sender_id: window.localStorage.getItem("biscut"),
                    receiver_id: receiver._id,
                    state: "sent",
                });
                socket.send(data);
                setNewMsg("");
            } else {
                alert("Select a User to send Msg")
            }
        }
    };

    return (
        <div className="flex flex-row items-center m-4 gap-4">
            <input
                className="flex-1 p-1.5 pl-4 text-base bg-zinc-800 rounded-md text-gray-100 outline-none"
                type="text"
                onChange={(e) => setNewMsg(e.target.value)}
                value={newMsg}
                placeholder="Send Msg..."
            />
            <button
                ref={buttonRef}
                className="px-2 text-2xl text-violet-500"
                onClick={(e) => handleSendMSG(e)}
            >
                <IoSend />
            </button>
        </div>
    )
}

export default ChatInput

import { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import { FaArrowsRotate } from "react-icons/fa6";
// import Route from './utils/Route';

const ChatWindow = ({ msgs }) => {
    const messagesEndRef = useRef(null);
    const [animateLoading, setAnimateLoading] = useState(false);
    
    const userId = window.localStorage.getItem("biscut");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    const content = msgs?.map((msg, i) => {
        return (
            <div key={i} className={`p-3 w-full flex ${msg.message.sender_id === userId ? 'justify-end' : 'justify-start'}`}>
                <MessageBubble msg={msg} />
            </div>
        );
    });

    return (
        <div className="p-4 flex flex-col items-stretch m-2 overflow-y-auto custom-scrollbar h-full select-none">
            <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2"
                onClick={() => setAnimateLoading(curr => !curr)}
            >
                <FaArrowsRotate className={`${animateLoading ? 'animate-spin' : ' '}`} />
                Syncing old messages...
            </div>
            {content}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatWindow;
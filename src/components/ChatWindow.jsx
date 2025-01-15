import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
// import Route from './utils/Route';

const ChatWindow = ({ msgs }) => {
    const messagesEndRef = useRef(null);
    
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
        <div className="p-4 flex flex-col items-stretch m-2 overflow-y-auto custom-scrollbar h-full">
            {content}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatWindow;
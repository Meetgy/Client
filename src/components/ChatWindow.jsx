import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
// import Route from './utils/Route';

const ChatWindow = ({ msgs}) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    const content = msgs?.map((msg, i) => {
        return (
            <MessageBubble msg={msg} key={i} />
        );
    });

    return (
        <div className="p-4 flex flex-col items-center m-2 overflow-y-auto custom-scrollbar h-full">
            {content}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatWindow;
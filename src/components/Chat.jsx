import { useEffect, useRef } from 'react';

const Chat = ({ msgs }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgs]);

    const content = msgs?.map((msg, i) => {
        return (
            <div key={i} className="flex flex-col items-center w-full">
                <div className="text-white flex flex-row items-center bg-violet-400 px-2 py-1 rounded-md self-end">
                    {msg?.message?.content}
                </div>
                <div className="text-zinc-400 text-xs self-end">
                    {msg?.message?.state}
                </div>
            </div>
        );
    });

    return (
        <div className="p-4 flex flex-col items-center m-2 overflow-y-auto custom-scrollbar h-full">
            {content}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Chat;
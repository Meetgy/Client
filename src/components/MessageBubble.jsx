const MessageBubble = ({ msg }) => {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="text-white flex flex-row items-center bg-violet-400 px-2 py-1 rounded-md self-end">
                {msg?.message?.content}
            </div>
            <div className="text-zinc-400 text-xs self-end">
                {msg?.message?.state}
            </div>
        </div>
    )
}

export default MessageBubble;
const Chat = ({ msgs }) => {

    const content = msgs?.map((msg, i) => {
        return (
            <div key={i} className="text-white flex flex-row items-center">
                {msg?.message?.content} - {msg?.message?.state}
            </div>
        );
    });

    return (
        <div className="flex flex-col items-center m-1">
            {content}
        </div>
    )
}

export default Chat;
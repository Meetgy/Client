import { useSelector } from "react-redux";

const MessageBubble = ({ msg }) => {
    const userId = useSelector(state => state.auth.userId);
    return (
        <div className={`max-w-[70%] rounded-lg p-3 my-1 ${
            msg.message.sender_id == userId
                ? 'bg-violet-400 text-white rounded-tr-none' 
                : 'bg-gray-200 text-gray-800 rounded-tl-none'
        }`}>
            {msg.message.content}
        </div>
    );
};

export default MessageBubble;
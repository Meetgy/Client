import Link from "./utils/Link";

const Connections = ({ data, handleConnection }) => {
    const userId = window.localStorage.getItem("biscut");

    let content = data?.map((user, i) => {
        if (user._id !== userId) {
            return (
                <Link to={`/dashboard/chat/${user._id}`} key={i} className="flex flex-row h-10 gap-2 m-2 p-1 outline-none" onClick={() => {
                    handleConnection(user);
                }} >
                    <div className="bg-violet-500 h-10 w-0.5"></div>
                    <div className="flex flex-col justify-betweenw ">
                        <div className="text-base">{user.name}</div>
                        <div className="text-xs">{user.username}</div>
                    </div>
                </Link>
            )
        }
    })

    return (
        <div className="bg-[#1a1a1d] text-white w-96 max-h-screen cursor-pointer rounded overflow-y-scroll custom-scrollbar p-4">
            <div className="text-xl font-bold text-white">Chats</div>
            {content}
        </div>
    )
}

export default Connections;
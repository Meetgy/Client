import Link from "./utils/Link";

const Connections = ({ data, handleConnection }) => {
    const userId = window.localStorage.getItem("biscut");

    let content = data?.map((user, i) => {
        if (user._id !== userId) {
            return (
                <Link to={`/dashboard/${user._id}`} key={i} className="flex flex-row gap-2" onClick={() => {
                    handleConnection(user);
                }} >
                    <div>{user.name}</div>
                    <div>{user.username}</div>
                </Link>
            )
        }
    })

    return (
        <div className="bg-zinc-950 text-white w-96 max-h-screen cursor-pointer">
            {content}
        </div>
    )
}

export default Connections;
const Connections = ({ data }) => {
    console.log(data)
    let content = data?.map((user, i) => {
        return (
            <div key={i} className="flex flex-row gap-2" >
                <div>{user.name}</div>
                <div>@{user.username}</div>
            </div>
        )
    })

    return (
        <div className="text-white">
            <div>
                Users
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default Connections;
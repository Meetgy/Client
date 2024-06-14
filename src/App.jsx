import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [socket, setSocket] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [msgs, setmsgs] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/chat?userId=${window.localStorage.getItem("biscut")}`)
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket);
    }
    socket.onmessage = (msg) => {
      setmsgs((msgs) => [...msgs, JSON.parse(msg.data)?.message?.content])
    }

    return () => {
      socket.close()
    }
  }, [])

  const handleSendMSG = () => {
    const connections = JSON.parse(window.localStorage.getItem("connections"));
    if (newMsg != "") {
      const data = JSON.stringify({
        content: newMsg,
        sender_id: window.localStorage.getItem("biscut"),
        receiver_id: connections[0],
        state: 'pending',
      });
      socket.send(data);
      setNewMsg("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      username: e.target.username.value,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      status: "online",
      connections: ["66641d65c4143d51b00480ed", "666569a036995de3965f84bb"]
      }
      
      axios.post('http://localhost:8000/user/signup', user)
      .then(function (response) {
        window.localStorage.setItem("biscut", response?.data?._id);
        window.localStorage.setItem("connections", JSON.stringify(response?.data?.connections));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (!socket) {
    return (
      <div>
        connecting to ws server. Loading...
      </div>
    )
  }
  const content = msgs.map((msg, i) => {
    return (
      <div key={i}>
        {msg}
      </div>
    )
  })
  return (
    <div className='bg-gray-900 w-screen h-screen'>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder='USERNAME' />
        <input name="name" type="text" placeholder='NAME' />
        <input name="email" type="text" placeholder='EMAIL' />
        <input name="password" type="text" placeholder='PASSWORD' />
        <button>JOIN</button>
      </form>
      <div>
        <div></div>
        {content}
        <input type="text" onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />
        <button onClick={handleSendMSG}>Send</button>
      </div>
    </div>
  )
}

export default App

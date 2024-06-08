import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [socket, setSocket] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [msgs, setmsgs] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/chat');
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
    if (newMsg != "") {
      const data = JSON.stringify({
        content: newMsg,
        sender_id: window.localStorage.getItem("biscut"),
        receiver_id: window.localStorage.getItem("connections")
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
      status: 'online',
      connections: ['66641d65c4143d51b00480ed']
    }

    axios.post('http://localhost:8000/user/signup', user)
    .then(function (response) {
      window.localStorage.setItem("biscut", response?.data?._id);
      window.localStorage.setItem("connections", response?.data?.connections);
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
    <>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder='USERNAME'/>
        <input name="name" type="text" placeholder='NAME'/>
        <input name="email" type="text" placeholder='EMAIL'/>
        <input name="password" type="text" placeholder='PASSWORD'/>
        <button>JOIN</button>
      </form>
      <div>
        {content}
        <input type="text" onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />
        <button onClick={handleSendMSG}>Send</button>
      </div>
    </>
  )
}

export default App

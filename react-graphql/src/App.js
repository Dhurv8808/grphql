import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_USER_LIST } from "./graphql/queries";
// import { CREATE_USER } from './graphql/mutation';
// import { useMutation } from "@apollo/client";
import { io }  from "socket.io-client";
const SERVER = "http://localhost:5000";

function App() {
  const socket = io(SERVER, { transports: ['websocket', 'polling', 'flashsocket'] });
  const { loading, error, data } = useQuery(GET_USER_LIST);

  const [myId, setMyId] = useState('');

  useEffect(() =>{
    const id = prompt("Enter your id");

    setMyId(id);
    socket.emit("user-connected", id)
  }, []);

  const sendMessage = (id) => {
    const message = prompt("Enter your id");
    socket.emit("send-message", {
      senderId: myId,
      reciverId: id,
      message
    });
  };

  socket.on("messageReceived", (data) => {
    let html = `<li> ${data} </li>`;
    document.getElementById("message").innerHTML = html + document.getElementById("message").innerHTML
  });

  // const [fromData, setFromData] = useState({});

  // const [createUser, {error, loading}] = useMutation(CREATE_USER);
  // console.log(error, loading);

  // const inputHandler = (e) => {
  //   setFromData({
  //     ...fromData,
  //     [e.target.name]: e.target.value
  //   });
  // }

  // const formSubmit = () => {
  //   createUser({
  //     variables: fromData
  //   });
  // }

  return (
    <div className="App">
      {/* <input name="name" onChange={inputHandler} />
      <input name="email" onChange={inputHandler} />
      <input name="userName" onChange={inputHandler} />
      <input name="password" onChange={inputHandler} />

      <button type="submit" className="btn btn-primary" onClick={formSubmit}> poiuytr</button> */}
      {!loading &&
        data.getUserList.map((item) => (
          <div style={{ margin: "10px", display: "flex" }} key={`${item.name}${item.id}`}>
            <li>{item.name}</li>
            <button onClick={() => sendMessage(item.id)}>{`send message to ${item.name}`}</button>
          </div>
        ))}

        <ul id="message"></ul>
    </div>
  );
}

export default App;

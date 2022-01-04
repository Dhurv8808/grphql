import { useState } from  'react';

// import { useQuery } from "@apollo/client";
// import { GET_USER_LIST } from "./graphql/queries";
import { CREATE_USER } from './graphql/mutation';
import { useMutation } from "@apollo/client";
function App() {
  // const { loading, error, data } = useQuery(GET_USER_LIST);
  // console.log(loading, error, data);

  const [fromData, setFromData] = useState({});

  const [createUser, {error, loading}] = useMutation(CREATE_USER);
  console.log(error, loading);

  const inputHandler = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value
    });
  }

  const formSubmit = () => {
    createUser({
      variables: fromData
    });
  }

  return (
    <div className="App">
      <input name="name" onChange={inputHandler} />
      <input name="email" onChange={inputHandler} />
      <input name="userName" onChange={inputHandler} />
      <input name="password" onChange={inputHandler} />

      <button type="submit" className="btn btn-primary" onClick={formSubmit}> poiuytr</button>
    </div>
  );
}

export default App;

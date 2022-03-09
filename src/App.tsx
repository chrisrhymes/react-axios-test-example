import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

type User = {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        let responseUsers: User[] = response.data.map((responseUser: any) => {
          return {
            id: responseUser.id,
            name: responseUser.name
          }
        })
        setUsers(responseUsers);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getData()}>Get users</button>
        <ul>
          {users?.map((user: User) => {
            return (<li key={user.id}>{user.name}</li>)
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;

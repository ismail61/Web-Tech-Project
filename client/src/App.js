import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Components/Route/Home'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {useEffect,useState} from 'react'
function App() {
  const [loginStatus,setLoginStatus] = useState("")
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const login = await axios.get("http://localhost:4444/login")
    if(login.data.isLogged == true){
      setLoginStatus(login.data.user[0].email)
      console.log(loginStatus)
    }
  }, [loginStatus])
  return ( 
       <Home email={loginStatus}/>
  );
}

export default App;

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import Login from './Components/Route/Login'
import Main from './Components/MyNote/Main'
import SignUp from './Components/Route/Signup';
import Account from './Components/Route/Account'
import Nav from './Components/Route/Nav'
import Logout from './Components/Route/Logout'
import Code from './Components/Route/Code'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [user, setUser] = useState([])
  const [search, setSearch] = useState("")
  const [mode, setMode] = useState(false)
  
  useEffect(() => {
    const user1 = localStorage.getItem('user')
    setUser(JSON.parse(user1))
    /* let themeColor = localStorage.getItem('mode');
    if (themeColor) {
      setMode(themeColor)
    } */
  }, [])
  const searchNote = (searchValue) => {
    setSearch(searchValue)
  }
  const darkMode = () => {
    //localStorage.setItem('mode', true)
    setMode(true)
  }
  const lightMode = () => {
    //localStorage.setItem('mode', false)
    setMode(false)
  }
  
  return (
    <>
      <Nav user={user} searchNote={searchNote} mode={mode} lightMode={lightMode} darkMode={darkMode} />
      <Switch>
        <Route path='/' exact component={() =>
          <Main user={user} search={search} mode={mode} />
        } />
        <Route path='/login' exact component={Login} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/signup' component={SignUp} />
        <Route path='/code/:id' component={Code} />
        <Route path='/account' component={() => <Account user={user}  mode={mode}  />} />
      </Switch>
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
    </>
  );
}

export default App;

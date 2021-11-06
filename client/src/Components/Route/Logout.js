import {  useEffect } from "react";
//import { useHistory } from "react-router-dom";
const Logout = () => {
    //const history = useHistory()
    useEffect(() => {
        localStorage.clear();
        window.location.href = "/login"
    }, [])
    return null;
};

export default Logout;

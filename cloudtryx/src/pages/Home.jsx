import { useSelector } from "react-redux";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";




export const Home = ()=>{
    const {isLoggedIn} = useSelector((state)=>state.user);
    
    return(
        <>
            {isLoggedIn? <Dashboard/>: <Login/>}
        </>
    );
};
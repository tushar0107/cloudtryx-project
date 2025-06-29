import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/UserSlice";
import { useEffect } from "react";



export const Dashboard = ()=>{
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user);

    useEffect(()=>{
        console.log(user);
    },[user]);
    return (
        <main id="dashboard">
            <div className="header">
                <h1>Dashboard Page</h1>
                <button className="btn" onClick={()=>{dispatch(logout())}}>Logout</button>
            </div>
            <span>Hello, {user.first_name + " "+ user.last_name}</span>
        </main>
    );
}
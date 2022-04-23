import React, {useState} from "react"
import classes from "./LoginPopup.module.css"
import Overlay from "../../Overlay/Overlay"
import LoginForm from "./LoginForm/LoginForm"
import TeamPage from "./TeamPage/TeamPage"
import { logIn } from "../../FETCH/POST/post"


const LoginPopup = ({handleLogin, loggedIn}) =>{

    const admin = {
        email: "sebster1992@gmail.com",
        password: "123",
        name: "Sebastian Fast",
        ceo: true,
        manager:false
    }

   const[user, setUser] = useState({name: "", email: ""})
   const[error, setError] = useState("")

   const login = async details => {
       if(details.email === admin.email && details.password === admin.password){
           console.log("LOGGED IN")
           setUser({
              name: admin.name,
               email: details.email
           })
           try{
            await logIn(user);
            return
           }catch(e){
               console.log(e)
           }

       }else {
           setError("Details do not match")
       }
   }

   const logout = () => {
       setUser({name: "", email: ""})
   }

    return(
        <Overlay>
        <div className={login ? classes.loggedIn : classes.loginMain}>
            {(user.email !== "") ? 
            <TeamPage admin={admin} logout={logout} />
            : 
            <LoginForm login={login} error={error} setError={setError}/>
            }
            <div className={classes.closeContainer}>
            <button onClick={(e)=>{handleLogin(e)}} type="button" className={classes.closeLogin}>
            <h3>Are you Sure?</h3>
            </button>
            </div>
            <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--green)" fillOpacity="1" d="M0,288L48,261.3C96,235,192,181,288,176C384,171,480,213,576,229.3C672,245,768,235,864,192C960,149,1056,75,1152,53.3C1248,32,1344,64,1392,80L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        </Overlay>
    )
}

export default LoginPopup
import React, {useState, useEffect} from "react"
import classes from "./LoginForm.module.css"

const LoginForm = ({login, error, setError}) => {
    const [details, setDetails] = useState({ email: "", password: ""})
    
    const submitHandler = async e => {
        e.preventDefault()

      
        login(details)
    }

    useEffect(()=>{
        if(error !== ""){
            setTimeout(() =>{
                setError("")
            }, 2000)
        }
    },[error, setError])
    
    return(
       <form className={classes.form} onSubmit={submitHandler}>
           <div className={classes.mainForm}>
               {/* ERROR! */}
               <h2 className={classes.login}>Login</h2>
               {(error !== "") ? ( <p className={classes.error}>{error}</p>) : ""}
               <div className={classes.formContainer}>
               <div className={classes.formGroups}>
                    <label className={classes.label} htmlFor="email" id="email">Email</label>
                    <input placeholder="Type your email" type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
               </div>
               <div className={classes.formGroups}>
                    <label className={classes.label} htmlFor="password" id="password">Password</label>
                    <input placeholder="Type your password" type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
               </div>
               <input className={classes.loginButton} type="submit" value ="LOGIN" />
               </div>
              
           </div>
       </form>
    )
}

export default LoginForm
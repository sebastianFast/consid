import React, {useState, useEffect} from 'react'
import classes from "./TeamPage.module.css"
import defaultLogo from "../../../images/defaultImage/default-book.png"
import Salary from './Components/Salary/Salary'
import Create from "./Components/Create/Create"
import Manage from "./Components/Manage/Manage"
import Team from "./Components/Team/Team"

const TeamPage = ({admin, logout}) => {
    const[salary, setSalary] = useState(false)
    const[manage, setManage] = useState(false)
    const[create, setCreate] = useState(false)
    const[team, setTeam] = useState(false)

    useEffect(()=>{
        if(salary === true){
            setSalary(false)
        }
        if(create === true){
            setCreate(false)
        }
        if(manage === true){
            setManage(false)
        }
        if(team === true){
            setTeam(false)
        }
    },[])

    const handleSalary = () => {
        setSalary(true)
        if(create === true){
            setCreate(false)
        }
        if(manage === true){
            setManage(false)
        }
        if(team === true){
            setTeam(false)
        }
    }

    const handleManage = () => {
        setManage(true)
        if(create === true){
            setCreate(false)
        }
        if(salary === true){
            setSalary(false)
        }
        if(team === true){
            setTeam(false)
        }
    }

    const handleCreate = () => {
        setCreate(true)
        if(salary === true){
            setSalary(false)
        }
        if(manage === true){
            setManage(false)
        }
        if(team === true){
            setTeam(false)
        }
    }

    const handleTeam = () => {
        setTeam(true)
        if(salary === true){
            setSalary(false)
        }
        if(manage === true){
            setManage(false)
        }
        if(create === true){
            setCreate(false)
        }
    }

  return (
    <>
 <div className={classes.welcome}>
     <div className={classes.imageContainer}>
        <img src={defaultLogo} alt="" className={classes.image}/>
     </div>
        <h2 className={classes.text}>{admin.name}</h2>
            <p className={classes.position}>
                {admin.ceo ? "CEO" : null}
                {admin.manager ? "Manager" : null}
                {!admin.manager && !admin.ceo ? "Employee" : null}
            </p>
        <nav className={classes.teamNav}>
            <ul className={classes.teamUl}>
                <li onClick={()=>{handleSalary()}} className={classes.teamLi}>
                    Salary
                </li>
                <li onClick={()=>{handleCreate()}} className={classes.teamLi}>
                    Create Employee
                </li>
                <li onClick={()=>{handleManage()}} className={classes.teamLi}>
                    Manage Employee
                </li>
                <li onClick={()=>{handleTeam()}} className={classes.teamLi}>
                    Teams
                </li>
            </ul>
        </nav>
        <button  onClick={logout} className={classes.logout}>Log out</button>
    </div>
    {(salary || manage || create || team) ? 
    <div className={classes.slideMenu}>
    {salary ? <Salary /> : null }
    {manage ? <Manage admin={admin} /> : null }
    {create ? <Create admin={admin} /> : null }
    {team ? <Team admin={admin} /> : null}
    </div>
    :
    <h2 className={classes.skoobTitle}>Skoob Employee</h2>
    }
        
    </>
  )
}

export default TeamPage
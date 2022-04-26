import React, { useRef,useEffect, useState, useContext } from 'react'
import { fetchEmployeeSorted } from '../../../../../FETCH/GET/get'
import classes from "./Team.module.css"
import {UserContext} from "../../../../../Contexts/UserContext"
import defaultImage from "../../../../../images/defaultImage/default-book.png"
import AddManager from './Components/AddManager'
import ShowTeam from './Components/ShowTeam'

const Team = () => {
    const {employee, setEmployee} = useContext(UserContext)
    const[manager, setManager] = useState(false)
    const[employeeTarget, setEmployeeTarget] = useState()
    const[showTeam, setShowTeam] = useState(false)
    const startRef = useRef()

    useEffect(()=>{
        startRef?.current.focus()
    },[])

    const handleManager = (employeeId) => {
        setManager(true)
        setEmployeeTarget(employeeId)
    }

    const handleAddTeam = () =>{
        setShowTeam(false)
    }

    const showTeams = () =>{
        setShowTeam(true)
    }

  return (
      <>
      {manager ? <AddManager setManager={setManager} employee={employee} employeeTarget={employeeTarget} /> : 
    <div className={classes.form}>
    <div className={classes.mainForm}>
   
    <div className={classes.formContainer}>
        <div className={classes.buttonContainer}>
    <button ref={startRef} onClick={()=>{handleAddTeam()}} className={classes.manage}>Add Team</button>
    <button onClick={()=>{showTeams()}} className={classes.manage}>Teams</button>
    </div>
   
    {showTeam ? <ShowTeam defaultImage={defaultImage} employee={employee}/> : 
    <>
    {employee?.map((employees, index)=>{
        return(
            <>
            {employees?.isCEO === false && (employees?.teamId !== employees?.team || employees.isManager === false) ? 
            <li key={index} className={classes.manageLi}>
            <div className={classes.imageHolder}>
              <img src={defaultImage} className={classes.employeeImage} alt="" />
            </div>
            <div className={classes.employeeInfo}>
           <h4>{employees?.firstName} {employees?.lastName}</h4> 
              {/*Check what position in the company the employee has*/}
              {employees?.isManager ? <p className={classes.position}>Manager</p> : null}
              {(!employees?.isManager && !employees?.isCEO) ? <p className={classes.position}>Employee</p> : null}
            <div className={classes.buttonContainer}>
            <button type="button" onClick={()=>{handleManager(employees)}} className={classes.addToTeam}>Add to Team</button>
             
            </div>
            </div>         
          </li>
            : null}
            </>
        )
    })}
    </>
    }
   
    </div>
</div>
</div>
}
</>
  )
}

export default Team
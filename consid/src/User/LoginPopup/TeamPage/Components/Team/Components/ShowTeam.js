import React, {useState, useRef} from 'react'
import classes from "./ShowTeam.module.css"

const ShowTeam = ({employee, defaultImage}) => {

 


  return (
    <div>
        {employee.map((emp, index)=>{
            return(
           
        <div  key={emp.id}>
            {emp.isManager === true ? 
            <div>
                <li key={index} className={classes.manageLi}>
                <div className={classes.imageHolder}>
                    <img src={defaultImage} className={classes.employeeImage} alt="" />
                </div>
                <div className={classes.employeeInfo}>
                    <h4>{emp?.firstName} {emp?.lastName} {emp?.team}</h4> 
                    {/*Check what position in the company the employee has*/}
                    {emp?.isManager ? <p className={classes.position}>Manager</p> : null}
                    {(!emp?.isManager && !emp?.isCEO) ? <p className={classes.position}>Employee</p> : null}
                </div>         
                </li>
            </div>
            :null}
        </div>
    
      
            )
        })}
    </div>
  )
}

export default ShowTeam
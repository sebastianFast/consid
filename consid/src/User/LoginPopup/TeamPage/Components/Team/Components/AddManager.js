import React from 'react'
import classes from "./AddManager.module.css"
import defaultImage from "../../../../../../images/defaultImage/default-book.png"
import { editUser } from '../../../../../../FETCH/EDIT/edit'

const AddManager = ({employeeTarget, employee, setManager}) => {

    const addManager = async (team) => {
        console.log(team)
        try{
            const updBody = {
                firstName: employeeTarget?.firstName,
                lastName: employeeTarget?.lastName,
                salary: employeeTarget?.salary,
                isCEO: employeeTarget?.isCEO,
                isManager: employeeTarget?.isManager,
                managerId: employeeTarget?.managerId,
                team: team
            }
           await editUser(employeeTarget.id ,updBody)
           setManager(false)
           return
        }catch(e){
            console.log(e)
        }
    }


  return (
   <div className={classes.cardMain}>
    {employee.map((emp, index) => {
      return(
          <>
        {emp?.isManager === true || emp?.isCEO === true ?
          <div key={emp.id} className={classes.card}>
              <div className={classes.imageHolder}>
                  <img src={defaultImage} alt="" className={classes.image}/>
              </div>
              <div className={classes.information}>
              <h3>{emp?.firstName} {emp?.lastName}</h3>
              {emp?.isManager ? <p className={classes.position}>Manager</p> : null}
              {emp?.isCEO ? <p className={classes.position}>CEO</p> : null}
              </div>
              <button type="button" onClick={()=>{addManager(emp.managerId)}} className={classes.addToTeam}>Add Manager</button>
          </div>
          : null}
          </>
      )  
    })}
   </div>
  )
}

export default AddManager
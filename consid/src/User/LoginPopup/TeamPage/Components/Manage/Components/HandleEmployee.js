import React, {useEffect, useState, useRef} from 'react'
import classes from "./HandleEmployee.module.css"
import { editUser } from '../../../../../../FETCH/EDIT/edit'


const HandleEmployee = ({setEditEmployee, employeeHolder}) => {

    const ceoRef = useRef()
    const managerRef = useRef()
    const employeeRef = useRef()
    const selectRef = useRef()

    //sets the details that is supposed to be updated
    //checks the current status of an employee 
    const[details, setDetails] = useState({ 
        firstname: employeeHolder.firstName,
        lastname: employeeHolder.lastName,
        salary: employeeHolder.salary,
        managerId : employeeHolder.managerId ? employeeHolder.managerId : 0,
        isCEO: selectRef.current?.value === "CEO" ? true : false,
        isManager: selectRef.current?.value === "Manager" ? true : false
      })

    //Checks what options has been selected 
    const[checkItem, setCheckItem] = useState()
    const itemStatus = (e) => {
        setCheckItem(e.target.value)
        if(selectRef.current.value === "CEO"){
        setDetails({...details, isCEO: true, isManager: false, managerId: 0})
        return
        }
        if(selectRef.current.value === "Manager"){
        setDetails({...details, isCEO: false, isManager: true})
        return
        }
        if(selectRef.current.value !== "Manager" && selectRef.current.value !== "CEO"){
        setDetails({...details, isCEO: false, isManager: false, managerId: 0})
        return
        }
    }

    //Checks what option should be selected for current employee
    useEffect(()=>{
        if(employeeHolder.isCEO){
            ceoRef.current.selected = true
            setDetails({...details, isCEO: true, isManager: false})
            return
        }
        if(employeeHolder.isManager){
            managerRef.current.selected = true
            setDetails({...details, isManager: true, isCEO: false})
            return
        }
        if(!employeeHolder.isManager && !employeeHolder.isCEO){
            employeeRef.current.selected = true
            setDetails({...details, isManager: false, isCEO: false})
            return
        }
        
    },[])

      //Takes care of the submit
      const submitHandler = async (e) => {
          e.preventDefault()
          try{
            await editUser(details, employeeHolder.id)
            setEditEmployee(false)
            return
          }catch(e){
              console.log(e)
          }
      }
  return (
     
        <form className={classes.form} onSubmit={(e)=>{submitHandler(e)}}>
        <div className={classes.mainForm}>
       
        <div className={classes.formContainer}>
        <h2 className={classes.manage}>Edit</h2>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="firstname" id="firstname">Firstname</label>
             <input type="text" name="firstname" id="firstname" onChange={e => setDetails({...details, firstname: e.target.value})} placeholder={employeeHolder.firstName} value={details.firstname} />
        </div>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="lastname" id="lastname">Lastname</label>
             <input  type="text" name="lastname" id="lastname" onChange={e => setDetails({...details, lastname: e.target.value})} placeholder={employeeHolder.lastName} value={details.lastname} />
        </div>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="salary" id="salary">Salary</label>
             <input type="number" name="salary" id="salary" onChange={e => setDetails({...details, salary: e.target.value})} placeholder={employeeHolder.salary}  value={details.salary} />
        </div>
        {checkItem === "Manager" || details.isManager === true ? 
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="managerId" id="managerId">Manager ID</label>
             <input  type="number" name="managerId" id="managerId" onChange={e => setDetails({...details, managerId: e.target.value})} placeholder={employeeHolder.managerId}  value={details.managerId} />
        </div>
        : null}
        
        <label htmlFor="type">Company position:</label>
        <select ref={selectRef} onChange={(e) => {itemStatus(e)}} name="type" id="type">
            <option ref={ceoRef} value="CEO">CEO</option>
            <option ref={managerRef} value="Manager">Manager</option>
            <option ref={employeeRef} value="Employee">Employee</option>
        </select>
        <input className={classes.editButton} type="submit" value ="EDIT" />
        <button className={classes.editButton} type="button" onClick={()=>{setEditEmployee(false)}}>Cancel</button>
        </div>
    </div>
</form>
  )
}

export default HandleEmployee
import React, {useState, useRef, useContext} from 'react'
import classes from "./Create.module.css"
import { addNewUser } from '../../../../../FETCH/POST/post'
import {UserContext} from "../../../../../Contexts/UserContext"

const Create = () => {
  
  const {employee, setEmployee} = useContext(UserContext)
  const ceoRef = useRef()
  const managerRef = useRef()
  const employeeRef = useRef()
  const selectRef = useRef()

  //sets the details that is supposed to be updated
  //checks the current status of an employee 
  const[details, setDetails] = useState({ 
      firstname: "",
      lastname: "",
      salary: "",
      isCEO: true,
      isManager: false
    })

  //Checks what options has been selected 
  const[checkItem, setCheckItem] = useState()
  const itemStatus = (e) => {
      setCheckItem(e.target.value)
      if(selectRef.current.value === "CEO"){
      setDetails({...details, isCEO: true, isManager: false})
      return
      }
      if(selectRef.current.value === "Manager"){
      setDetails({...details, isCEO: false, isManager: true})
      return
      }
      if(selectRef.current.value !== "Manager" && selectRef.current.value !== "CEO"){
      setDetails({...details, isCEO: false, isManager: false})
      return
      }
  }

    //Takes care of the submit
    const submitHandler = async (e) => {
      e.preventDefault()
        for(let i = 0; i<employee.length; i++){
          if(employee[i].isCEO === true && details.isCEO === true){
            console.log("Cant have 2 CEOS")
            return
          }
        }
        try{
          await addNewUser(details)
         
          return
        }catch(e){
            console.log(e)
        }
    }
  return (
    <form className={classes.form} onSubmit={(e)=>{submitHandler(e)}}>
        <div className={classes.mainForm}>
       
        <div className={classes.formContainer}>
        <h2 className={classes.manage}>Create</h2>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="firstname" id="firstname">Firstname</label>
             <input required type="text" name="firstname" id="firstname" onChange={e => setDetails({...details, firstname: e.target.value})} placeholder={"Firstname..."} value={details.firstname} />
        </div>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="lastname" id="lastname">Lastname</label>
             <input required  type="text" name="lastname" id="lastname" onChange={e => setDetails({...details, lastname: e.target.value})} placeholder={"Lastname..."} value={details.lastname} />
        </div>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="salary" id="salary">Salary</label>
             <input required type="number" name="salary" id="salary" onChange={e => setDetails({...details, salary: e.target.value})} placeholder={"Salary..."}  value={details.salary} />
        </div>
        
        
        <label htmlFor="type">Company position:</label>
        <select required ref={selectRef} onChange={(e) => {itemStatus(e)}} name="type" id="type">
            <option ref={ceoRef} value="CEO">CEO</option>
            <option ref={managerRef} value="Manager">Manager</option>
            <option ref={employeeRef} value="Employee">Employee</option>
        </select>
        <input className={classes.editButton} type="submit" value ="Create" />
        </div>
    </div>
</form>
  )
}

export default Create
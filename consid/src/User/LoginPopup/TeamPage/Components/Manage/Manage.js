import React, {useState,  useContext, useEffect} from 'react'
import classes from "./Manage.module.css"
import {UserContext} from "../../../../../Contexts/UserContext"
import defaultImage from "../../../../../images/defaultImage/default-book.png"
import { deleteUser } from '../../../../../FETCH/DELETE/delete'
import HandleEmployee from './Components/HandleEmployee'

const Manage = ({admin}) => {
  const {employee, setEmployee} = useContext(UserContext)

 

  const[editEmployee, setEditEmployee] = useState(false)
  const[employeeHolder, setEmployeeHolder] = useState({
    firstName: "",
    lastName: "",
    salary: "",
    id: "",
    isManager: undefined,
    isCEO: undefined,
    teamId: "",
    team: ""
  })

  const[details, setDetails] = useState({ 
    firstname: "",
    lastname: "",
  })


  const submitHandler = e => {
    e.preventDefault()
    searchEmployee()

}

const[searchResult, setSearch] = useState(<li></li>)
 
const searchEmployee =  () => {

 //Check if there is any input in the search and if not search by all
if(details.firstname !== "" && details.lastname !== ""){
  for(let i = 0; i< employee.length; i++){
    if((details.firstname === employee[i].firstName && details.lastname === employee[i].lastName)){
      setSearch(<li className={classes.manageLi}>
                  <div className={classes.imageHolder}>
                    <img src={defaultImage} className={classes.employeeImage} alt="" />
                  </div>
                  <div className={classes.employeeInfo}>
                    <h3 className={classes.name}>{employee[i].firstName + " " + employee[i].lastName}</h3>
                    {/*Check what position in the company the employee has*/}
                      {employee[i].isCEO ? <p className={classes.position}>CEO</p> : null}
                      {employee[i].isManager ? <p className={classes.position}>Manager</p> : null}
                      {(!employee[i].isManager && !employee[i].isCEO) ? <p className={classes.position}>Employee</p> : null}
                  <div className={classes.buttonContainer}>
                    <button type="button" onClick={() => removeEmployee(employee[i].id)} className={classes.remove}>Remove</button>
                    <button type="button" onClick={()=>{handleEmployee(employee[i])}}  className={classes.edit}>Edit</button>
                  </div>
                  </div>         
                </li>)
        return;
    }
  }
  return
}
//Check if there is no input and then maps through all employees
else 
if(details.firstname === "" && details.lastname === ""){
  
  setSearch(employee.map((emply, key) =>{
            return(
                    <li className={classes.manageLi} key={emply.id}>   
                    <div className={classes.imageHolder}>
                    <img src={defaultImage} className={classes.employeeImage} alt="" />
                    </div>
                    <div className={classes.employeeInfo}>
                      <h3 className={classes.name}>{emply.firstName + " " + emply.lastName}</h3>
                        {emply.isCEO ? <p className={classes.position}>CEO</p> : null}
                        {emply.isManager ? <p className={classes.position}>Manager</p> : null}
                        {(!emply.isManager && !emply.isCEO) ? <p className={classes.position}>Employee</p> : null} 
                      <div className={classes.buttonContainer}>
                        <button type="button" onClick={()=>{removeEmployee(emply.id)}} className={classes.remove}>Remove</button>
                        <button type="button" onClick={()=>{handleEmployee(emply)}} className={classes.edit}>Edit</button>
                      </div>
                      </div>
                    
                    </li>
                    
              )
          
            }))
          
          }
        }

//Edit employee on click
const handleEmployee = async (emp) =>{
  try{

    setEmployeeHolder({
      firstName: emp.firstName,
      lastName: emp.lastName,
      salary: emp.salary,
      isCEO: emp.isCEO,
      isManager: emp.isManager,
      teamId: emp.teamId,
      id: emp.id,
      team: emp.team
    })
    setEditEmployee(true)
    setSearch(<li>Employee Edited</li>)
  }catch(e){
    setSearch(<li>{e}</li>)
  }
}


//remove employee on click
const removeEmployee = async (id) => {
  try{
    await deleteUser(id)
    setSearch(<li>Employee Deleted</li>)
  return
  }catch(e){
    setSearch(<li>{e}</li>)
  }
}



  return (
    <>
    {(searchResult.length >= 1 || searchResult.props?.children?.length > 0 || searchResult.innerHTML === "Employee Deleted") && !editEmployee  ?  
    <div className={classes.employeeCard}> <ul className={classes.employeeUl}>{searchResult}</ul>
   
    </div>: 
    <>
    {!editEmployee ? 
    <form className={classes.form} onSubmit={submitHandler}>
    <div className={classes.mainForm}>
        <h2 className={classes.manage}>Manage</h2>
        <div className={classes.formContainer}>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="firstname" id="firstname">Firstname</label>
             <input placeholder="Firstname..." type="text" name="firstname" id="firstname" onChange={e => setDetails({...details, firstname: e.target.value})} value={details.firstname} />
        </div>
        <div className={classes.formGroups}>
             <label className={classes.label} htmlFor="lastname" id="lastname">Lastname</label>
             <input placeholder="Lastname..." type="text" name="lastname" id="lastname" onChange={e => setDetails({...details, lastname: e.target.value})} value={details.lastname} />
        </div>
        <input className={classes.searchButton} type="submit" value ="SEARCH" />
        </div>
    </div>
</form>
: null}
</>
    }
     {editEmployee ? <HandleEmployee  admin={admin} employeeHolder={employeeHolder} setEditEmployee={setEditEmployee} /> : null}
    </>
  )
}

export default Manage
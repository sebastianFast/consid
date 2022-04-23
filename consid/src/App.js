
import "./global.css"
import classes from "./App.module.css"
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import UserExplore from './User/UserExplore/UserExplore.js';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import React, {useState, useEffect, Suspense} from "react"
import { UserContext } from './Contexts/UserContext.js';
import { CategoryContext } from './Contexts/CategoryContext.js';
import { ItemContext } from './Contexts/ItemContext.js';
import Inventory from './User/Inventory/Inventory.js';
import LoginPopup from './User/LoginPopup/LoginPopup.js';
import { enableScrolling } from './GlobalFunctions/noScroll.js';
import {fetchItems, fetchCategory, fetchEmployeeSorted} from "./FETCH/GET/get.js"



function App() {
  const[employee, setEmployee] = useState([]);
  const[category, setCategory] = useState([]);
  const[items, setItems] = useState([]);
  const[loggedUser, setLoggedUser] = useState();
  const UserMainPage = React.lazy(()=> import("./User/UserMainPage/UserMainPage.js"));

  const[nonIndex, setNonIndex] = useState()

  useEffect(()=>{
    setTimeout(()=>{
      window.scrollTo({top:0, left:0,  behavior: 'smooth'});
    },700)
    
    async function fetchContexts() {
      const employeeResponse =  await fetchEmployeeSorted(setEmployee);
      const itemsResponse =  await fetchItems(setItems);
      const categoriesResponse =  await fetchCategory(setCategory);
     
       }
       fetchContexts() 
  },[])



//Open Login Popup
const[login, setLogin] = useState(false)

const handleLogin = (e) => {
  e.stopPropagation()
  e.preventDefault()

  if(e.target.innerHTML !== "Login"){
    enableScrolling()
  }

  setLogin(!login)
}


  
  return (
    <BrowserRouter>
     <UserContext.Provider value={{employee, setEmployee}}>
       <ItemContext.Provider value={{items, setItems}}>
       <CategoryContext.Provider value={{category, setCategory}}>
    <div  className={classes.app}>
    <Suspense fallback={<div>Loading ...</div>}>
     <Header setNonIndex={setNonIndex} nonIndex={nonIndex} handleLogin={handleLogin}/>
   {login ? 
   <LoginPopup loggedIn={login} handleLogin={handleLogin}/>
   : null}
      <Routes>
        <Route exact path="/" element={<UserMainPage setNonIndex={setNonIndex} />}/>
        <Route path="/explore" element={<UserExplore/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
      </Routes>
      <Footer  />
      </Suspense>
    </div>
    </CategoryContext.Provider>
    </ItemContext.Provider>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

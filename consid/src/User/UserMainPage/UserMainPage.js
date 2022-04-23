import React, {useState, useContext, useEffect} from "react"
import { UserContext } from "../../Contexts/UserContext"
import IndexMenu from "../../Header/IndexMenu/IndexMenu"
import IndexPage from "./IndexPage/IndexPage"
import MainCards from "./MainCards/MainCards"
import classes from "./UserMainPage.module.css"

const UserMainPage = ({handleLogin, setNonIndex}) => {

    useEffect(()=> {
        setNonIndex(false);
    },[])


    return(
        <main className={classes.userMain}>
           
            <IndexPage />
            <MainCards />
               
        </main>
    )
}

export default UserMainPage
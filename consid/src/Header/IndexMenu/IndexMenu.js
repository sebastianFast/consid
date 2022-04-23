import React, { useState, useContext, useEffect, useRef } from "react"
import classes from "./IndexMenu.module.css"
import { ItemContext} from "../../Contexts/ItemContext"
import {gsap, Power2} from "gsap"
import {NavLink} from "react-router-dom"
import { checkScroll } from "../../GlobalFunctions/offset.js"

const IndexMenu = ({handleLogin, setNonIndex, nonIndex}) =>{

    //HandleLogin opens the Login Popup owned by App: App -> UserMainPage -> IndexMenu
    //setNonIndex && nonIndex checks if the header is on the index page or not and sets it accordingly

    const {items} = useContext(ItemContext)
    const hiddenRef = useRef();
    const menuRef = useRef();
    const circleRef= useRef();
    const menuTitleRef= useRef();
    const companyRef= useRef();
    const bottomMenuRef = useRef()

    const [newItem, setNewItem] = useState([])
    const[activeMenu, setActiveMenu] = useState(true)
    const[hidden, setHidden] = useState(true)

    //Check offsetY
    const [offset, setOffset] = useState(0);
    useEffect(() => {
       checkScroll(setOffset)
       console.log(window.location.toString())
       //Check that is needed for refreshing the page
       //Set the menu to notIndex mode
       if(window.location.toString() === "http://localhost:3000/explore"){
        setIndexMenu();
       }
    }, []);

    //Kolla om urln inte är index
    const setIndexMenu = () => {
        setNonIndex(true)
        gsap.to(menuRef.current,{ minHeight: "unset",duration: 0.6,ease: Power2.easeOut});
           
    }


    const [check, setCheck] = useState()
    //Check if scroll is lower than 400 and if so remove company div
    useEffect(()=>{
       
        if(offset > 400){
            if(check === false || nonIndex === true){
                return
            }

            gsap.to(companyRef.current,{y: -20, opacity: 0,duration: 0.2,ease: Power2.easeOut});
            gsap.to(companyRef.current,{ display: "none",duration: 0.2,ease: Power2.easeOut}).delay(0.2);
            gsap.to(menuRef.current,{ padding: "0px 10px 0px 10px", height: "45px", minHeight: "unset",duration: 0.6,ease: Power2.easeOut});
            gsap.to(bottomMenuRef.current,{ opacity: 0 , x: -100, duration: 0.5,ease: Power2.easeOut});
            gsap.to(bottomMenuRef.current,{ opacity: 1 , x: 0, duration: 0.5,ease: Power2.easeOut}).delay(0.6);
            setCheck(false)
            return
        }
        else 
        if(offset < 400){
            if(check === true || nonIndex === true){
                return
            }
           
            gsap.to(companyRef.current,{y: 0, opacity: 1,duration: 0.2,ease: Power2.easeOut});
            gsap.to(companyRef.current,{display: "flex",duration: 0.2,ease: Power2.easeOut}).delay(0.2);
            gsap.to(menuRef.current,{height: "auto", minHeight: "30vh",padding: "10px",duration: 0.6,ease: Power2.easeOut});
            gsap.to(bottomMenuRef.current,{ opacity: 0 , x: -100, duration: 0.5,ease: Power2.easeOut});
            gsap.to(bottomMenuRef.current,{ opacity: 1 , x: 0, duration: 0.5,ease: Power2.easeOut}).delay(0.6);
            setCheck(true)
            return
        }
    },[offset])


    //Check if items been loaded from database
    //If not dont set the menu
    useEffect(()=>{
        if(items?.length === 0 ){
            setActiveMenu(false)
            return
        }
        setActiveMenu(true)
        setNewItem(items)
    },[items])

    //Create animations for opening the menu
    const showMenu = (e) => {
        e.stopPropagation()
        setHidden(false)
        setTimeout(()=>{
            gsap.to(hiddenRef.current, {display: "flex", duration: 0.8,ease: Power2.easeOut});
        },150)
        gsap.to(menuRef.current,{height: "100vh",width: "250px",duration: 0.6,ease: Power2.easeOut});
        gsap.to(circleRef.current,{ x: -225, rotation:"180_cw", duration: 1, ease: Power2.easeInOut});
        gsap.to(menuTitleRef.current, { x: -155, duration: 0.7, ease: Power2.easeInOut})
        return;
    }

    //Get elements into their original shape when closing menu
    const cancelMenu = (e) => {
        e.stopPropagation()
        setHidden(true)
        setTimeout(()=>{
            gsap.to(hiddenRef.current,{display: "none", duration: 0.4,ease: Power2.easeOut});
        }, 150)
        gsap.to(menuRef.current,{width: "auto", height: "auto", duration: 0.6,ease: Power2.easeIn});
        gsap.to(circleRef.current,{ x: 0, rotation:"0_cw", duration: 1, ease: Power2.easeInOut});
        gsap.to(menuTitleRef.current, { x: 0, duration: 0.7, ease: Power2.easeInOut})
        return; 
    }
    
    
  

    return(
        <div ref={menuRef} onMouseLeave={(e)=>{cancelMenu(e)}} onMouseEnter={(e)=>{showMenu(e)}} className={nonIndex ? classes.nonIndexMenu : classes.indexMenu}>
        {
        nonIndex 
        ? 
        null 
        : 
            <div ref={companyRef} className={classes.comapnyContainer}>
            <h4 className={classes.newTitle}>
                Company Name
            </h4>
            <div className={classes.line}></div>
            <h5 className={classes.inspoTitle}>
                Get inspired
            </h5>
            
            <nav className={classes.menuNav}>
                <ul className={classes.menuUl}>
                    {activeMenu ? 
                    <>
                     {newItem?.slice(0, 3).map((item, index)=>
                     {
                         
                        return(
                            <li key={index} className={classes.newItem}>
                                {item.title}
                            </li>
                        )
                    })}
                    </>
                    : 
                    <div className={classes.noItemsContainer}>
                        <h5 className={classes.noItems}>
                            No new Releases
                        </h5>
                    </div>
                    }
               
                  
                </ul>
            </nav>
            </div>
        }
            <div ref={bottomMenuRef} className={classes.bottomMenu}>
            <h5 ref={menuTitleRef} className={classes.menuTitle}>
                Menu
                </h5>
                    <div ref={circleRef} className={classes.circle}>
                    <i className={classes.arrow}></i>
                    </div>
            </div>
                
                {hidden ? null : 
                <>
                <nav className={classes.hiddenNav} ref={hiddenRef}>
                    <ul className={classes.hiddenUl}>
                    <NavLink to="/">
                        <li className={classes.hiddenLi}>Home</li>
                        </NavLink>
                        <NavLink to="/explore">
                        <li onClick={()=>{setIndexMenu()}} className={classes.hiddenLi}>Explore</li>
                        </NavLink>
                       
                        <li onClick={(e)=>{handleLogin(e)}} className={classes.hiddenLi}>Login</li>
                    </ul>
                </nav>
                </>
            }
        </div>
    )
}

export default IndexMenu
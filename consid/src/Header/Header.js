import React, {useEffect, useState, useRef} from "react"
import classes from "./Header.module.css"
import logo from "../images/logo.png"
import HeaderList from "./Components/HeaderList/HeaderList"
import SearchBar from "./Components/SearchBar/SearchBar"
import MyCart from "./Components/MyCart/MyCart"
import {NavLink} from "react-router-dom"
import {gsap, Power2} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {checkScroll} from "../GlobalFunctions/offset.js"
import IndexMenu from "./IndexMenu/IndexMenu"
import cn from "classnames"
gsap.registerPlugin(ScrollTrigger);

const Header = ({setNonIndex, nonIndex, handleLogin}) => {

   

    const headerRef = useRef()
    const logoRef = useRef()
    const listRef = useRef()
    
    /*Header List items*/
    const[list, setList] = useState([
        "Books",
        "Audio",
        "Ref. Books",
        "Dvd"
    ])


    //Check offsetY
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        checkScroll(setOffset);
    }, []);

    useEffect(()=>{
        if(nonIndex === true){
            return
        }
        if(offset > 400){
            gsap.to(headerRef.current,{ height: "45px", backgroundColor:"var(--bark) ", duration: 0.4, ease: Power2.easeOut});
            gsap.to(logoRef.current,{ height: "35px", width: "35px", duration: 0.4, ease: Power2.easeOut});
            gsap.to(listRef.current,{ color: "var(--antique)", duration: 0.4, ease: Power2.easeOut});
            return
        }
        else if(offset< 400){
            if(nonIndex === true){
                return
            }
            gsap.to(headerRef.current,{ height: "60px", backgroundColor:"transparent ", duration: 0.4, ease: Power2.easeInOut});
            gsap.to(logoRef.current,{ height: "50px", width: "50px", duration: 0.4, ease: Power2.easeOut});
            gsap.to(listRef.current,{ color: "var(--bark)", duration: 0.4, ease: Power2.easeOut});
            return
        }
        
    },[offset])
 

    /*Click event Header List*/

    return(
        <header ref={headerRef}  className={nonIndex ? classes.headerNonIndex : classes.header}>
               <NavLink to="/">
            <div className={classes.logoContainer}>
                <img ref={logoRef} src={logo} className={classes.logo} alt="Skoob" />
            </div>
            </NavLink>
            <nav ref={listRef} className={classes.listContainer}>
                <ul>
            {list.map((item, index)=>{
                return(
                    <HeaderList  key={index} listItem={item} nonIndex={nonIndex}/>
                )
            })}
            </ul>
            </nav>
            <div className={classes.searchContainer}>
           <SearchBar />
           </div>
           <div className={classes.myCartContainer}>
           <MyCart nonIndex={nonIndex}/>
           </div>
           <IndexMenu handleLogin={handleLogin} setNonIndex={setNonIndex} nonIndex={nonIndex}/>
        </header>
    )
}

export default Header
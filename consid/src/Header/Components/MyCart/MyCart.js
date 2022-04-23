import React, {useState, useRef, useEffect} from "react"
import classes from "./MyCart.module.css"
import cart from "../../../images/cart.png"
import {NavLink} from "react-router-dom"
import { checkScroll } from "../../../GlobalFunctions/offset"

const MyCart = ({nonIndex}) => {
   
    const cartRef= useRef()
   const[active, setActive] = useState(false)

   //Check offsetY
   const [offset, setOffset] = useState(0);

   useEffect(() => {
      checkScroll(setOffset)
   }, []);

   //Open menu for Cart
   const showMenu = (e) =>{
       e.stopPropagation()
        setActive(!active)
   }

   useEffect(()=>{
        if(cartRef.current == null || nonIndex === true) {
            return
        }
        if(offset> 400){
            cartRef.current.style.color = "var(--antique)"
            return
        }
        else if(offset<400){
            cartRef.current.style.color = "var(--bark)"
            return
        }
   },[offset])




    return(
        <>
      <NavLink to="/inventory">
        <div onMouseEnter={(e)=>{showMenu(e)}} onMouseLeave={(e)=>{showMenu(e)}} className={ classes.myCart}>
            <div ref={cartRef} className={classes.textHolder}>
            {active ? 
                   <p  className={nonIndex ? classes.nonIndexCart : classes.cartMenuText}>
                       Show my items
                   </p>
            : null
            }
            </div>
            <div className={classes.imageHolder}>
                <img className={classes.image} alt="MyCart" src={cart} />
            </div>
            <div className={classes.itemCounter}>
            <p className={classes.counter}>0</p>
            </div>
        </div>
        </NavLink>
        </>
    )
}

export default MyCart
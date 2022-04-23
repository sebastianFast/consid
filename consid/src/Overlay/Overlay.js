import React, {useEffect} from "react"
import classes from "./Overlay.module.css"
import { disableScrolling } from "../GlobalFunctions/noScroll";

const Overlay = ({children}) => {

    //This component is used for a nonScrollable overlay 
    //Meant to be used globally

    useEffect(() => {
        window.addEventListener("scroll", disableScrolling);
        document.body.style.overflow = "hidden";
    }, []);

    return(
        <div className={classes.overlay}>
            {children}
        </div>
    )
}

export default Overlay
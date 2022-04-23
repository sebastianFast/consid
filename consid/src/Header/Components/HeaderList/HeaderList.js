import React from "react"
import classes from "./HeaderList.module.css"

const HeaderList = ({listItem, nonIndex} ) => {
    return(
       
           <li className={nonIndex ? classes.listButtonNonIndex : classes.listButton}>{listItem}</li> 
      
    )
}

export default HeaderList
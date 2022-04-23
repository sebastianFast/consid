import React from 'react'
import classes from "./Borrow.module.css"

import ReactReadMoreReadLess from "react-read-more-read-less";

const Borrow = ({borrowBook, item, itemDesc}) => {
  return (
    <div className={classes.wrapper}>
     <div className={classes.itemText}>
    <h2 className={classes.itemTitle}>Title: {item.title}</h2>
    <p className={classes.itemAuthor}>Author: {item.author}</p>
    <p className={classes.itemType}>Type: {item.type}</p>
    </div>
    <div className={classes.readMore}>
    <ReactReadMoreReadLess
        charLimit={150}
        readMoreText={"read more"}
        readLessText={"read less"}
    >
    {itemDesc.description}
    </ReactReadMoreReadLess>
    </div>    
    {item.type === "Ref. Book" ? null : 
    <div className={classes.itemStatus}>
    <p>Status: In stock</p>
    <button type="button"  className={classes.borrowBook} onClick={(e)=>{borrowBook(e, item)}}>Borrow me</button>
    </div>
}
   </div>
  )
}

export default Borrow
import React from 'react'
import classes from "./Return.module.css"
import ReactReadMoreReadLess from "react-read-more-read-less";

const Return = ({returnItem, item, itemDesc}) => {


  return (
    <div className={classes.wrapper}>
   <div className={classes.itemText}>
   <h2 className={classes.itemTitle}>Title: {item.title}</h2>
    <p className={classes.itemAuthor}>Author: {item.author}</p>
    <p className={classes.itemType}>Type: {item.type}</p>
   </div>
   <ReactReadMoreReadLess
    charLimit={150}
    readMoreText={"read more"}
    readLessText={"read less"}
    >
    {itemDesc.description}
    </ReactReadMoreReadLess>
    {item.type === "Ref.Book" ? null : 
   <div className={classes.itemStatus}>
   <p>Status: Is being borrowed</p>
   <small className={classes.itemBorrower}>by: {item.borrower} at: {item.borrowDate}</small>
    <button type="button"  onClick={(e)=>{returnItem(e, item)}} className={classes.returnBook}>Return Item</button>
   </div>
}
   </div>
  )
}

export default Return
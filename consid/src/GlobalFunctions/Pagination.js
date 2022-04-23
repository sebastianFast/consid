import React  from 'react'
import classes from "./Pagination.module.css"

const Pagination = ({postPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
   

    for(let i=1; i<= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

   
  return (
    <nav className={classes.navLink}>
        <ul className={classes.ulLink}>
            {pageNumbers?.map(number =>{
                return(
                <li key={number} className={classes.liLink}>
                    <button type="button" onClick={()=>{paginate(number)}}  className={classes.aLink}>
                        {number}
                    </button>
                </li>
                )
            })}
        </ul>
    </nav>
  )
}

export default Pagination
import React, {useEffect, useState} from "react"
import classes from "./SearchBar.module.css"
import {fetchSearchItem} from "../../../FETCH/GET/get.js"
import logoImage from "../../../images/logo.png"
import { editItem } from "../../../FETCH/EDIT/edit"

const SearchBar = () => {

    const [details, setDetails] = useState({ searchString: ""})
    const[searchResult, setSearch] = useState([]);
    const[error, setError] = useState({
        error: "",
        search: ""
    })
    const[borrowSuccess, setBorrowSuccess] = useState(false);

    useEffect(()=>{
        if(details.searchString === ""){
            setSearch([])
            setError({
                error: "",
                search: ""
            })
        }
    },[details.searchString])

    
    //Check if the fetch has something otherwise set Error
    //If fetch set the items
    const submitHandler =  (e) => {
        e.preventDefault()
        const promise = new Promise((res, rej) => {
            res( fetchSearchItem(details.searchString, setSearch) )
            rej ( setError({ error: "No Search results: ", search: details.searchString}))
        })
        promise.catch(() => {
                  return setError({ error: "Something went wrong", search: ""})
        })
    }

    //Click event to cancel search box
    const cancelSearch = () => {
       setDetails({ searchString: ""})
       if(borrowSuccess === true){
           setBorrowSuccess(false)
       }
    }

    //Click event to borrow an item
    const borrowBook = (e) => {
        e.preventDefault()

        //Static name holder
        const name = "My Name"


        const borrower = {
            CategoryId: searchResult[0].categoryId,
            Title: searchResult[0].title,
            Author: searchResult[0].author,
            Pages: searchResult[0].pages,
            RunTimeMinutes: searchResult[0].runTimeMinutes,
            IsBorrowable: false,
            Borrower: name,
            Type: searchResult[0].type
        }

        try{
            editItem(borrower, searchResult[0].id, true)

            setBorrowSuccess(true);
            return
        }catch(e){
            console.log(e.error)
        }
        

    }

    return(
        <form className={classes.searchForm} onSubmit={submitHandler}>
        <div className={classes.searchBar}>
            <label className={classes.label} htmlFor="searchBar">Im looking for:</label>
           <input  onChange={e => setDetails({...details, searchString: e.target.value})} value={details.searchString} className={classes.search} id="searchBar" name="searchBar" type="search" placeholder="Search ..." />
          
            
            {((details.searchString == null || details.searchString === "undefined") ) 
            ? 
            null 
            : 
             <>
                 {searchResult.length > 0
                    
                 ? 
                 <div className={classes.searchResults}>
                       <button type="button" className={classes.cancelButton} onClick={()=>{cancelSearch()}}><span></span></button>
                 <div className={classes.searchBox}>
               
                    {searchResult.map((result, index)=>{
                         return(
                             <div key={index} className={classes.resultBox}>
                                 {borrowSuccess === true ? null :
                                 <div className={classes.imageContainer}>
                                 <img src={logoImage} alt="" className={classes.image}/>
                                 </div>
                                 }
                            {(result.isBorrowable === true && borrowSuccess === false) ? 
                            <div className={classes.resultInfo}>
                                <p>Title: {result.title}</p>
                                <p>Author: {result.author}</p>
                                <p>Type: {result.type}</p>
                                <p>Status: In stock</p>
                                <button className={classes.borrowBook} onClick={(e)=>{borrowBook(e)}}>Borrow Me</button>
                            </div>
                            :
                            <div className={classes.resultInfo}>
                                <p>Title: {result.title}</p>
                                <p>Author: {result.author}</p>
                                <p>Type: {result.type}</p>
                                <p>Status: Currently borrowed</p>
                                <p>Borrower: {result.borrower}</p>
                                <p>Since: {result.borrowDate}</p>
                                </div>
                            }
                            {borrowSuccess === true ?
                            <div className={classes.success}>
                                <h4>Item Booked!</h4>
                            </div>
                            : 
                            null
                            }
                            
                            </div>
                         )
                     }) 
                     } 
                 </div> 
                 </div>
                 : 
                null
                 }
                {(searchResult.title === "Not Found" )  ? 
                   <div className={classes.searchResultsError}>
                        <button type="button" className={classes.cancelButton} onClick={()=>{cancelSearch()}}><span></span></button>
                   <div className={classes.searchBoxError}>
                  
                   <li className={classes.errorLi} >
                            {error.error}{error.search}
                        </li>
                    </div>
                </div>
                 : null}

                 </>
          
            }
        </div>
        </form>
    )
}

export default SearchBar
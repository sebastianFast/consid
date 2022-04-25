import React, { useEffect, useState } from "react"
import classes from "./UserExplore.module.css"
import background from "../../images/happyreading.png"
import cn from "classnames"
import { editItem } from "../../FETCH/EDIT/edit"
import Pagination from "../../GlobalFunctions/Pagination"
import ItemCards from "./Components/ItemCards/ItemCards.js"
import { fetchItems, fetchTitle, fetchSearchItemAllString } from "../../FETCH/GET/get"
import Popup from "./Components/Popup/Popup"

const UserExplore = () => {
    const [items, setItems] = useState()
    const [details, setDetails] = useState({ searchString: ""})
    const[titleCheck, setTitleCheck]=useState(false);
    const[buttonCheck, setButtonCheck]=useState(false);
    const[searchBarCheck,setSearchBarCheck] = useState(false)
    const [popUp, setPopup] = useState(false)
    const[itemRemoved, setItemRemoved] = useState(false)   
    const[isSubmit, setIsSubmit] = useState(false)
   
    //Get all items on first render
   useEffect(()=>{
         fetchItems(setItems)
       
   },[])

   //rerender items when an item is being updated, removed, added
   useEffect(()=>{
       if(titleCheck === true){
           fetchTitle(setItems)
           return
       }
       if(searchBarCheck === true){
           fetchSearchItemAllString(details.searchString, setItems)
           return
       }
        return  fetchItems(setItems)

},[titleCheck, buttonCheck, searchBarCheck, itemRemoved, isSubmit])
    

    //Pagination
    //Put the current page to one
    //Choose how many items per page you want to render
    const[currentPage, setCurrentPage] = useState(1);
    const[postPerPage] = useState(5);

    //Get current post
    //Calculate how many pages
    //Find the first page
    //Slice the posts accordingly
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = items?.length >= 1 ? items?.slice(indexOfFirstPost, indexOfLastPost) : null;

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    //Scroll to top on render
    useEffect(()=>{
        window.scrollTo({
            top:0,
            left: 0,
            behavior: "smooth"
        })
    },[])

    //Check customer
    //This function checks if the item is being borrowed or if it is being returned
    //calls the item edit on the backend and stores it
    const borrower = async (bool, name, item) => {
        var borrower = {
            CategoryId: item.categoryId,
            Title: item.title,
            Author: item.author,
            Pages: item.pages,
            RunTimeMinutes: item.runTimeMinutes,
            IsBorrowable: bool ? true : false,
            Borrower: name,
            Type: item.type
        }
       
        try{
            await editItem(borrower, item.id, true)
            setButtonCheck(!buttonCheck)
            return
        }catch(e){
            console.log(e)
        }
        return
    }

      //Click event to borrow an item
      const borrowBook = async (e, item) => {
        e.preventDefault() 
        
        //Static name holder
        const name = "My Name" 
      await borrower(false, name, item)
       
    }

    //Return an item
    const returnItem = async (e, item) => {
        e.preventDefault()
       console.log(item.type)
        const name = "";
       await borrower(true, name, item)
    }

    //Search for categoryID ascending
    //Default behaviour
    const searchCategory = async () => {
        if(searchBarCheck === true){
            setSearchBarCheck(false)
        }
        setTitleCheck(false)
       await fetchItems(setItems)
    }

    //Search for title ascending
    const searchTitle = async () => {
        if(searchBarCheck === true){
            setSearchBarCheck(false)
        }
        setTitleCheck(true)
        await fetchTitle(setItems)
    }

    //Serach for string in searchbox
    const submitHandler = (e) => {
        e.preventDefault();
        if(titleCheck === true){
            setTitleCheck(false)
        }
        setSearchBarCheck(true)
        setButtonCheck(!buttonCheck);
    }
    
    //handle popup
    const[popRoute, setPoproute] = useState();
    
    const handlePopup = (route) => {
        setPoproute(route)
        setPopup(true)
    }

    const [itemId, setItemId] = useState()
    //remove item
    const handleRemove = (e, item) => {
        e.preventDefault()
        
        setItemId(item?.id)
        
        handlePopup("remove")
    }

    //edit an item
    const handleEdit = (e, item) => {
        e.preventDefault()
        setItemId(item?.id)
       
        handlePopup("edit")
    }

    //add new item
    const addItem = (e) => {
        e.preventDefault()
        handlePopup("add")
    }

    return(
        <div className={classes.mainInventory}>
            <div className={classes.backgroundContainer}>
            <img className={classes.background} src={background} alt="" />
            <div className={cn(classes.backgroundContainer, classes.overlay)}></div>
            </div>
            <div className={classes.topContainer}>
                <div className={classes.topContent}>
                    <h2 className={classes.title}>
                        Explore our Universe
                    </h2>
                    <span className={classes.line}></span>
                    <form onSubmit={(e)=>{submitHandler(e)}}>
                    <input  onChange={e => setDetails({...details, searchString: e.target.value})} value={details.searchString} className={classes.search} id="searchBar" name="searchBar" type="search" placeholder="Search ..." />
                    </form>
                <div className={classes.buttonContainer}>
                    <button type="button" onClick={()=>{searchCategory()}} className={classes.categoryButton}>Category</button>
                    <button type="button" onClick={()=>{searchTitle()}} className={classes.typeButton}>Title</button>
                    <button type="button" onClick={(e)=>{addItem(e)}} className={classes.add}>Add item</button>
                </div>
                </div>
            </div>
            <div className={classes.botContainer}>
               
            
                {items?.length >= 1 
                ?
                <>
                {currentPost?.map((item, index) => {
                    
                    return(
                        <ItemCards handleEdit={handleEdit} handleRemove={handleRemove} setPopup={setPopup} key={index} item={item} returnItem={returnItem} borrowBook={borrowBook} />
                    )
                })
                } 
                </>
                : 
                <div className={classes.reload}>
                   <ItemCards loading={true} />
                </div>
                }
                {items?.length > 3 ? <Pagination paginate={paginate} postPerPage={postPerPage} totalPosts={items?.length} /> : null}
            </div>
            {popUp ? <Popup setIsSubmit={setIsSubmit} isSubmit={isSubmit} itemRemoved={itemRemoved} setItemRemoved={setItemRemoved} setPoproute={setPoproute} popRoute={popRoute} itemId={itemId} setPopup={setPopup} returnItem={returnItem} borrowBook={borrowBook}/> : null}
            
        </div>
    )
}

export default UserExplore
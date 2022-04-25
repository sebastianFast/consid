import React, {useState} from 'react'
import Borrow from './Borrow/Borrow'
import classes from "./ItemCards.module.css"
import background from "../../../../images/happyreading.png"
import Return from './Return/Return'
import defaultImage from "../../../../images/defaultImage/default-book.png"

const ItemCards = ({item, returnItem, borrowBook, setButtonCheck, setPopup, handleRemove, handleEdit, loading }) => {
  //Item checks what item is pressed and is used to show information about the item
  //returnItem is a function passed down to return component to be able to return an item
  //BorrowBook is a function passed down to borrow a book
  //SetbuttonCheck is an important check to let the useEffect that holds the fetches know that something should be fethced
  //setPopup initiate the popup 
  //handle remove looks removes items
  //handle edit edits items
  //Loading -> sets a loading item

    const[itemDesc] = useState({
        description: "Phasellus vitae risus convallis, venenatis nibh vel, venenatis ex. Nunc posuere at ex euismod sagittis. Proin venenatis et tortor vitae scelerisque. Ut aliquam hendrerit nunc vitae ultrices. Etiam non risus eros. Mauris quis dictum nulla. Quisque ullamcorper dolor libero, non posuere magna mollis eu. Aliquam quis augue rhoncus, ultrices justo ac, volutpat urna. Proin suscipit interdum odio in ullamcorper. Donec ullamcorper porttitor mauris at commodo. Cras ac lacus nec eros tincidunt tristique ut non urna. Ut at congue nisl. In hac habitasse platea dictumst. Donec nec tellus interdum sapien dapibus vulputate vitae ac dolor.Quisque ac rhoncus quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec mauris urna, eleifend dictum blandit ut, fermentum quis erat. Duis metus odio, dictum sit amet augue nec, lobortis elementum lacus. Sed posuere augue id faucibus hendrerit. Maecenas posuere ut odio nec congue. Vivamus ac ex rutrum, accumsan ligula a, tempor turpis. Duis ut arcu nunc. Vivamus pretium quis elit quis hendrerit. Vivamus viverra efficitur nulla."
    })

  if(loading){
    return(
      <div className={classes.imageLoader}>
      <div  className={classes.itemCardDefault}>
      <div className={classes.imageHolder}>
          <img src={defaultImage} alt="" className={classes.image}/>
      </div>
      <div className={classes.loaderText}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        </div>
     </div>
     </div>
    )
  }


  return (
    <div  className={classes.itemCard}>
    <div className={classes.imageHolder}>
        <img src={background} alt="" className={classes.image}/>
    </div>
   {item?.isBorrowable || item?.type === "Ref. Book" ? 
   <Borrow setButtonCheck={setButtonCheck} borrowBook={borrowBook} item={item} itemDesc={itemDesc}/>
   : 
   <Return  item={item} returnItem={returnItem} itemDesc={itemDesc} />
    }
   {(item?.isBorrowable === true || item?.type === "Ref. Book") ? 
   <>
     <button onClick={(e)=>{handleEdit(e, item)}} type="button" className={classes.editItem}>
     edit
    </button>
   
    <button onClick={(e)=>{handleRemove(e, item)}} type="button" className={classes.removeItem}>
      <span className={classes.relativeRemove}>
      </span>
    </button>
    </>
    : null}
   </div>
  )
}

export default ItemCards
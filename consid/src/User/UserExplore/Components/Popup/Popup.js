import React, { useEffect, useState } from 'react'
import { deleteItem } from '../../../../FETCH/DELETE/delete'
import { enableScrolling } from '../../../../GlobalFunctions/noScroll'
import Overlay from '../../../../Overlay/Overlay'
import AddValidate from './AddValidate/AddValidate.js'
import classes from "./Popup.module.css"

const Popup = ({setPopup, itemId, popRoute, setPoproute, itemRemoved, setItemRemoved, setIsSubmit, isSubmit}) => {

    //itemId checks what item should be edited or removed
    //Poproute and setpoproute is a check to find out what the user is trying to to, ex - poproute "remove" -> remove
    //setPopup is a state that checks if the popup should be active

    useEffect(()=>{
        if(itemRemoved === true){
            setItemRemoved(false)
        }
    },[])

   

    const handleCancel = () => {
        enableScrolling()
        setPoproute("")
        setPopup(false)
        setItemRemoved(false)
    }

    const removeItem = async (e) => {
        console.log(e.target)
        try{
        await deleteItem(itemId)
        setItemRemoved(true)
        return
        }catch(e){
            console.log(e)
            return
        }
    }

   

  return (
      <div className={classes.overlayParent}>
        <Overlay>
            <div className={(popRoute === "edit" || popRoute === "add") ? classes.popUpEdit : classes.popUpMain}> 
            {popRoute === "remove" ? 
                 <>
                <h2 className={classes.title}>
                {itemRemoved ? "Item has been removed" : "Do you want to remove this item?" }
                </h2>
                <div className={classes.buttonContainer}> 
                <button type="button" onClick={()=>{handleCancel()}} className={classes.cancel}>Cancel</button>
                {itemRemoved ? null : 
                <button type="button" onClick={(itemId)=>{removeItem(itemId)}} className={classes.remove}>Remove</button>
                }
                </div>
                </>
                : null}
            {(popRoute === "edit" || popRoute === "add")  ? 
                <>
                <h2 className={classes.titleEdit}>
                    {popRoute === "add" ? "Add item" : "Edit this item"}
                </h2>
            
                {popRoute === "add" ? 
                  <AddValidate handleCancel={handleCancel} setIsSubmit={setIsSubmit} isSubmit={isSubmit}/>
                :
                <AddValidate itemId={itemId} edit={true} handleCancel={handleCancel} />
                
                }
                <button type="button" onClick={()=>{handleCancel()}} className={classes.cancel}>Cancel</button>

                </>
            : null}
            </div>
        </Overlay>
    </div>
  )

}

export default Popup
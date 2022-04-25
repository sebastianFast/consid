import React,{useState, useRef, useEffect} from 'react'
import classes from "./AddValidate.module.css"
import { addItem } from '../../../../../FETCH/POST/post'
import { editItem } from '../../../../../FETCH/EDIT/edit'


const AddValidate = ({setIsSubmit, isSubmit, handleCancel, edit, itemId}) => {



  

     //input refs
     const titleRef = useRef()
     const authorRef = useRef()
     const durationRef = useRef()
     const pagesRef = useRef()

    //Checks the option value
  const[checkItem, setCheckItem] = useState("Book")
  const itemStatus = (e) => {
    setIsSubmit(false)
      setCheckItem(e.target?.value)
  }
    //form Validation
    const [initialState, setInitialState] = useState({
          title : "",
          author: "",
          pages: 0,
          runTimeMinutes: 0,
          borrower: "",
          cateogryId: "",
          type: "Book"
    })

useEffect(()=>{
  setInitialState({
    title : "",
    author:  "",
    pages: 0,
    runTimeMinutes:  0,
    borrower: "",
    cateogryId:  "",
    type:checkItem
   })
},[])


  const[formValue, setFormValues] = useState(initialState)
  const[formError, setFormError] = useState({})

  //reset value if select option switches
  useEffect(()=> {
    //InitialStates for the value form
    setInitialState({
        title : "",
        author: "",
         pages: 0,
         runTimeMinutes: 0,
         borrower: "",
         cateogryId: "",
         type: checkItem,
         isBorrowable: checkItem?.value === "Ref. Book" ? false : true
       })
  //Checks for if the option value is switched
   titleRef.current.value = "";
   if(checkItem === "Book" || checkItem === "Ref. Book"){
    pagesRef.current.value = "";
   }
   if(checkItem === "DVD" || checkItem === "Audio"){
    durationRef.current.value = "";
   }
   authorRef.current.value = "";

   setFormValues()
  
  },[checkItem])

  //Check the value of the inputs
  const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValue, 
          [name]: value,  
           borrower: "",
          cateogryId: "",
          type: checkItem,
          isBorrowable: checkItem?.value === "Ref. Book" ? false : true
        })
        
  }

  const handleSubmit = async (e) => {
   await setFormError(validate(formValue))
    try{
    await setFormValues({
      title : formValue?.title,
      author: formValue?.author,
       pages: formValue?.pages ? formValue.pages : 0,
       runTimeMinutes: formValue?.runTimeMinutes ? formValue?.runTimeMinutes : 0,
       borrower: "",
       cateogryId: "",
       type: checkItem,
       isBorrowable: checkItem?.value === "Ref. Book" ? false : true
     })
     if(edit){
        await editItem(formValue, itemId)
        setIsSubmit(true)
        return
     }
      await addItem(formValue)
      setIsSubmit(true)
    }catch(e){
      console.log(e)
    }
   
}

  //validate form
  const validate = (values) => {
     
  
    const errors =[]
    if(values != null && values !== "undefined" && !values?.title  ){
        errors.title = "Title is required"
    }
    if(values != null && values !== "undefined" && !values?.author){
        errors.author = "Author is required"
    }
    if(values != null && values !== "undefined" && !values?.runTimeMinutes && (checkItem === "DVD" || checkItem === "Audio") ){
        errors.runTimeMinutes = "Duration is required"
    }
    if(values != null && values !== "undefined" && !values?.pages && (checkItem === "Book" || checkItem === "Ref. Book") ){
        errors.pages = "Pages is required"
    }
    return errors
  }

 
    
  return (
      <>
      {(checkItem === "Book" || checkItem === "Ref. Book") && isSubmit ? 
      <div>
   {isSubmit && !formError?.title && !formError?.author && !formError?.pages && authorRef?.current?.value.length > 0 && titleRef?.current?.value.length > 0 && pagesRef.current.value.length > 0 ? <div>Success</div>: null}
   </div>
  :  
  null}
   {(checkItem === "Audio" || checkItem === "DVD") && isSubmit ? 
  <div>
  {isSubmit && !formError?.title && !formError?.author && !formError?.pages && authorRef?.current?.value.length > 0 && titleRef?.current?.value.length > 0 && durationRef?.current?.value.length > 0 ? <div>Success</div>: null}
  </div> : null}
  
   <form className={classes.formSubmit} onSubmit={(e)=>{handleSubmit(e)} }>
        <div className={classes.field}>
        <label htmlFor='title'>Title: </label>
        <input value={formValue?.title} ref={titleRef} onChange={(e)=>{handleChange(e)}} id="title" name="title" placeholder='Title...' type="text" className={classes.inputTitle} />
        </div>
        <p>{formError?.title}</p>

        <div className={classes.field}>
        <label htmlFor='author'>Author: </label>
        <input value={formValue?.author} ref={authorRef} onChange={(e)=>{handleChange(e)}} id="author" name="author" placeholder='Author...' type="text" className={classes.inputAuthor} />
        </div>
        <p>{formError?.author}</p>

        {(checkItem === "DVD" || checkItem === "Audio") ? 
        <>
        <div className={classes.field}>
        <label htmlFor='runTimeMinutes'>Duration: </label>
        <input value={formValue?.runTimeMinutes} ref={durationRef} onChange={(e)=>{handleChange(e)}} id="runTimeMinutes" name="runTimeMinutes" placeholder='Duration...' type="number" className={classes.inputDuration}  />
        </div>
        <p>{formError?.runTimeMinutes}</p>
        </>
        : null}
        
        {(checkItem === "Book" ||checkItem === "Ref. Book") ?
        <>
        <div className={classes.field}>
        <label htmlFor='pages'>Pages: </label>
        <input value={formValue?.pages} ref={pagesRef} onChange={(e)=>{handleChange(e)}} id="pages" name="pages" placeholder='Pages...' type="number" className={classes.inputPages}  />
        </div>
        <p>{formError?.pages}</p>
        </>
        : null }

        <label htmlFor="type">Choose a type:</label>
        <select onChange={(e) => {itemStatus(e)}} name="type" id="type">
            <option value="Book">Book</option>
            <option value="Audio">Audio</option>
            <option value="DVD">DVD</option>
            <option value="Ref. Book">Ref. Book</option>
        </select>
         <input  type="submit"  className={classes.add} value="Submit" /> 
       
    </form>
</>
  )
}

export default AddValidate
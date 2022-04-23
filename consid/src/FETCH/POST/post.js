import React from "react"

  const logIn = async (mail, password) =>{
    try {
      const response = await fetch('https://localhost:7174/employee/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({email: mail, password: password})
       });
       const data = await response.json();
       console.log(data);
     } catch(error) {
        console.log(error + "tja")
       } 
  }

  //Add a User
  const addNewUser = async (user) =>{
    console.log(user)
      try {
          const response = await fetch('https://localhost:7174/employee', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
             },
             body: JSON.stringify(user)
           });
           const data = await response.json();
           console.log(data);
         } catch(error) {
            console.log(error)
           } 
      }

    
      //Add Item
      const addItem = async (item) =>{
        console.log(item)
        try {
            const response = await fetch('https://localhost:7174/items', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
               },
               body: JSON.stringify(item)
             });
             const data = await response.json();
             console.log(data);
           } catch(error) {
              console.log(error)
             } 
        }

      
          //Add Category
      const addCategory = async (categoryName) =>{
        try {
            const response = await fetch('https://localhost:7174/category', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
               },
               body: JSON.stringify(categoryName)
             });
             const data = await response.json();
             console.log(data);
           } catch(error) {
              console.log(error)
             } 
        }

        export {addNewUser, addItem, addCategory, logIn}
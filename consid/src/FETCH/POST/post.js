import React from "react"

  //login
 /* const logIn = async (mail) =>{
    try {
      const response = await fetch('https://localhost:7174/employee/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({email: mail.email, password: mail.password})
       });
       const data = await response.json();
       console.log(data)
     } catch(error) {
        console.log(error)
       } 
  }*/

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
         } catch(error) {
            console.log(error)
           } 
      }

    
      //Add Item
      const addItem = async (item) =>{
        try {
            const response = await fetch('https://localhost:7174/items', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
               },
               body: JSON.stringify(item)
             });
             const data = await response.json();
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
           } catch(error) {
              console.log(error)
             } 
        }

        export {addNewUser, addItem, addCategory}
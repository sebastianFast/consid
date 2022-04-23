const deleteUser = async (id) =>{
    try {
        const response = await fetch('https://localhost:7174/employee/' + id, {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify(id)
         });
         const data = await response.json();
         console.log(data);
       } catch(error) {
          console.log(error)
         } 
    }

    const deleteCategory = async (id) =>{
        try {
            const response = await fetch('https://localhost:7174/category/' + id, {
             method: 'DELETE',
             headers: {
               'Content-Type': 'application/json'
               },
               body: JSON.stringify(id)
             });
             const data = await response.json();
             console.log(data);
           } catch(error) {
              console.log(error)
             } 
        }

        const deleteItem = async (id) =>{
          
            try {
                const response = await fetch('https://localhost:7174/items/' + id, {
                 method: 'DELETE',
                 headers: {
                   'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(id)
                 });
                 const data = await response.json();
                 console.log(data);
               } catch(error) {
                  console.log(error)
                 } 
            }

            export {deleteCategory, deleteItem, deleteUser}
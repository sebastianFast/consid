const editUser = async (item ,id) =>{
  console.log(item)
    try {
        const response = await fetch('https://localhost:7174/employee/' + id, {
         method: 'PUT',
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

    const editCategory = async (item ,id) =>{
        try {
            const response = await fetch('https://localhost:7174/category' + id, {
             method: 'PUT',
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

        const editItem = async (item , id) =>{
            try {
                const response = await fetch('https://localhost:7174/items/' + id, {
                 method: 'PUT',
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

            export { editCategory, editUser, editItem}
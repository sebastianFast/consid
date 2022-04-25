

const fetchEmployee = async (setEmployee) => {
    await fetch("https://localhost:7174/employee/all")
     .then(res => {
       return res.json();
     })
     .then(data => {
         setEmployee(data)
     })
     .catch(error => console.log("Error"));
   }



   const fetchEmployeeSorted = async (setEmployee) => {
     console.log(setEmployee)
    await fetch("https://localhost:7174/employee")
     .then(res => {
       return res.json();
     })
     .then(data => {
         setEmployee(data)
     })
     .catch(error => console.log("Error"));
   }

   const fetchOneEmployee = async (setEmployee, id) => {
    await fetch("https://localhost:7174/employee/" + id)
     .then(res => {
       return res.json();
     })
     .then(data => {
         setEmployee(data)
     })
     .catch(error => console.log("Error"));
   }


   const fetchItems = async (setItems) => {
     await fetch("https://localhost:7174/items")
      .then(res => {
        return res.json();
      })
      .then(data => {
          setItems(data)
      })
      .catch(error => console.log("Error"));
    }

    //FETCH TITLES
    const fetchTitle = async (setItems) => {
      await fetch("https://localhost:7174/title")
      .then(res =>{
        return res.json();
      }).then(data =>{
        setItems(data)
      })
      .catch(error=> console.log(error))
    }

    const fetchSearchItem = async (searchString, setSearch) => {
      await fetch("https://localhost:7174/search/title/" + searchString)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setSearch(data)
        })
        .catch(error => console.log("Error"));
    }

    const fetchSearchItemAuthor = async (searchString, setSearchAuthor) => {
      await fetch("https://localhost:7174/search/author/" + searchString)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setSearchAuthor(data)
        })
        .catch(error => console.log("Error"));
    }

    const fetchSearchItemAllString = async (searchString, setItems) => {
      await fetch("https://localhost:7174/search/all/" + searchString)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setItems(data)
        })
        .catch(error => console.log("Error"));
    }

    const fetchOneItems = async (setItems , id) => {
      console.log(id)
      await fetch("https://localhost:7174/items/" + id)
       .then(res => {
         return res.json();
       })
       .then(data => {
           setItems(data)
       })
       .catch(error => console.log("Error"));
     }

    const fetchCategory = async (setCategory) => {
     
     await fetch("https://localhost:7174/category")
      .then(res => {
        return res.json();
      })
      .then(data => {
          setCategory(data)
      })
      .catch(error => console.log("Error"));
    }
    
    const fetchOneCategory = async (setCategory, id) => {
      await fetch("https://localhost:7174/category/" + id)
       .then(res => {
         return res.json();
       })
       .then(data => {
           setCategory(data)
       })
       .catch(error => console.log("Error"));
     }


    export {  fetchSearchItemAllString, fetchEmployeeSorted, fetchTitle, fetchItems, fetchEmployee, fetchCategory, fetchOneCategory, fetchOneItems, fetchOneEmployee, fetchSearchItem, fetchSearchItemAuthor}
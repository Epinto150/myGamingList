const cleanUserInput = formInput => {
    Object.keys(formInput).forEach(field => {
      if(formInput[field] === "" && field !== "description") {
        delete formInput[field]
      }
    })
    return formInput
  }
  
  export default cleanUserInput
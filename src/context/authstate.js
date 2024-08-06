import React, { useState } from "react";
import AuthContext from './authcontext';

const AuthState = (props) => {

    const [token,setToken]=useState("")
    const [tap,settap]=useState(false)
    const [b,setb]=useState(false)
    const [success,setsuccess]=useState(false)
   
    const [name,setName]=useState("")

    const login = async (email,password)=>{
        const url ="http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
           
            
          },
          
          body:JSON.stringify({email,password})
        })

        const json = await response.json();
        
        
        
        setToken(json.authtoken)
        setsuccess(json.success)
        settap(true)
        
        
        
        



    }

    const signin= async (name,email,password)=>{
     
        const url ="http://localhost:5000/api/auth/createuser"
        const response = await fetch(url, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            
            
          },
          
          body:JSON.stringify({name,email,password})
        })

        const json=await response.json()
        setToken(json.authtoken)
        setsuccess(json.success)
        settap(true)
       
        

    }

    const logout=()=>{
      setsuccess(false)
      setToken("")
      settap(false)
      
    }

    const getuser= async ()=>{
      const url ="http://localhost:5000/api/auth/getuser"
    
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" :token
          
          
        },
        
        
      })

      const json=await response.json()
      
      setName(json.name)
     
      
    }

    


    return (
        <AuthContext.Provider value={{token,setToken,success,login,signin,logout,name,getuser,tap,settap,b,setb}}>
            {props.children}
        </AuthContext.Provider>
        
      )


}

export default AuthState
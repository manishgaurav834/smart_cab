import React, { useState,useContext } from "react";
import TripContext from './tripcontext';
import AuthContext from "./authcontext";


const TripState = (props) => {
    const context=useContext(AuthContext);
    const {token}=context;

    const [alltrip,setAlltrip]=useState([]);

    const gettrips = async ()=>{
        const url ="http://localhost:5000/api/trip/fetchalltrips"
    
      const response = await fetch(url, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" :token
          
          
        },
        
        
      })

      const json=await response.json()
      console.log(json)
      setAlltrip(json)
      console.log(alltrip)
        
        
        
        



    }

    const addtrip=async(D_name,startX,startY,destinationX,destinationY)=>{
        const url="http://localhost:5000/api/trip/addtrip"
        console.log(D_name,startX,startY,destinationX,destinationY);
        const response = await fetch(url, {
            method: "Post", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" :token
             
              
            },
            body:JSON.stringify({D_name,startX,startY,destinationX,destinationY})
            
            
          })
    
          const json=await response.json()
          
          setAlltrip(prevalltrip => [...prevalltrip, json]);
            
            
            
            
    


    }


    


    return (
        <TripContext.Provider value={{alltrip,gettrips,addtrip}}>
            {props.children}
        </TripContext.Provider>
        
      )


}

export default TripState
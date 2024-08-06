import React, { useState,useContext } from "react";
import CabContext from './cabcontext';
import AuthContext from "./authcontext";


const CabState = (props) => {
    const context=useContext(AuthContext);
    const {token}=context;

    const [allcab,setAllcab]=useState([]);

    
    const getcabs = async ()=>{
        const url ="http://localhost:5000/api/cab/fetchallcab"
    
      const response = await fetch(url, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" :token
          
          
        },
        
        
      })

      const json=await response.json()
      console.log(json);
      
      setAllcab(json)
      
        
        
        
        



    }

    const updatecab =async (id,X,Y,status,curr)=>{
        const url =`http://localhost:5000/api/cab/updatecab/${id}`
        console.log(status)
        const response = await fetch(url, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" : token
            
          },
          body:JSON.stringify({X,Y,status,curr})
          
        });
        const json = await response.json();
        console.log(json)
        var arr=allcab
        for(var i=0;i<allcab.length;i++){
            if(arr[i]._id===json._id){
                arr[i]=json;
                break;
            }
        }
        setAllcab(arr);
        
  
          
      }


    


    return (
        <CabContext.Provider value={{allcab,getcabs,updatecab}}>
            {props.children}
        </CabContext.Provider>
        
      )


}

export default CabState
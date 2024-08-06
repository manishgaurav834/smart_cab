import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCab} from '@fortawesome/free-solid-svg-icons'
const Trip = (props) => {
    const {sx,sy,dx,dy,name,date}=props;
    
  return (
    <div className="flex gap-x-3 w-full my-2 bg-black/40 border-2 text-white text-md font-bold border-white rounded-md  h-20  items-center justify-between">
    <div className="flex items-center cursor-pointer">  
           <FontAwesomeIcon icon={faCab} className="mx-3 h-6 w-6" />
           
           <div className=" mr-2 font-bold text-md sm:text-xl"><p className=" cursor-pointer">{name}</p></div>
     </div>
     <div className="mx-8">From:{sx},{sy} To:{dx},{dy}</div>
     <div>{ date}</div>
    
   
 </div>
  )
}

export default Trip

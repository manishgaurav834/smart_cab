import React,{useContext,useEffect,useState} from 'react';
import AuthContext from '../context/authcontext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Signup = () => {
    const context= useContext(AuthContext)
    const{signin,success,tap,settap} = context
    const [cred,setCred]= useState({name:"",email:"",password:""})
    const navigate=useNavigate();


    const onChange=(e)=>{
        setCred({...cred,[e.target.name]: e.target.value})


    }

    const handleSubmit=async (e)=>{
       e.preventDefault();
       signin(cred.name,cred.email,cred.password)

    }

    useEffect(()=>{
        if(success){
            navigate('/')
        }

    },[success])

    useEffect(()=>{
   
    
      
      if(tap){
      setTimeout(() => {
        
          settap(false)
    
        
      },3000);
    }
  
  
    },[tap])

    

  return (
    <>
    
    <div className="top-0 bg-bg1 bg-cover sm:bg-center  absolute  w-full  h-screen   px-3 flex  justify-center">
    <Nav/>
    
    <div className="flex   flex-col items-center w-full p-4">
        <div className={`fixed top-16 w-full bg-red-700/70 h-10 flex items-center ${(!success && tap)?"block":"hidden"} text-xl p-2 `}>Alert : E-mail already used.</div>
        
        
        <div className="container mx-auto p-4 flex flex-col w-4/5 sm:w-2/5 items-center  text-white  rounded-lg backdrop-blur-sm bg-black/90 sm:bg-black/80 absolute sm:right-20  top-32   ">
       
        <form onSubmit={handleSubmit} className={`w-full my-1 `}>
        <label className="font-bold text-lg sm:text-xl my-1" htmlFor="name">Name</label><br/>
          <input type="name" id="name" name="name" className=" bg-black/20 p-2 h-10 rounded-xl w-full border-2 border-white my-4 " onChange={onChange} value={cred.name} /><br/>
          <label className="font-bold text-lg sm:text-xl my-1" htmlFor="email">E-mail</label><br/>
          <input type="email" id="email" name="email" className=" bg-black/20 p-2 h-10 rounded-xl w-full border-2 border-white my-4 " onChange={onChange} value={cred.email} /><br/>
          <label className="font-bold text-lg md:text-xl my-1" htmlFor="password">Password</label><br/>
          <input type="text" id="password" name="password" className=" bg-black/20 p-2 h-10 rounded-xl w-full border-2 border-white my-4 " onChange={onChange} value={cred.password}  required minLength={5} /><br/>
          <div className='flex '>
         <div className="flex w-full justify-center">
         <input type="submit" value="Sign-Up" className="bg-green-600 hover:opacity-95 hover:scale-105 text-white text-sm md:text-xl lg:text-2xl font-bold rounded-xl w-full sm:w-2/5 border-2 border-white   h-12 my-4 cursor-pointer"></input>
         </div>
          </div>
        
        </form>
        <div className="text-2xl my-1 ">or</div>
        
          
        <div className="flex justify-center sm:text-lg  w-full"><p>Already have an account?</p><Link to="/login" className="mx-2 hover:scale-105" ><u>Login</u></Link></div>
          
          
         




        </div>
       
       


    </div>

    </div>
      
    </>
  )
}

export default Signup
import React, { useState, useContext, useEffect } from 'react';
import tripContext from '../context/tripcontext';
import authContext from '../context/authcontext';
import cabContext from '../context/cabcontext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarAlt } from '@fortawesome/free-solid-svg-icons';

const Info = (props) => {
  const { sortedcab, setSortedcab, sx, sy, dx, dy} = props;
  const context = useContext(tripContext);
  const context1 = useContext(authContext);
  const { success } = context1;
  const { addtrip } = context;
  const context3 = useContext(cabContext);
  const { updatecab } = context3;
  const navigate = useNavigate();
  const [st,setst]= useState(true)
  

  const handleClick = (id,name,X,Y,status,curr) => {
    if(!curr){
      addtrip(name,Number(sx),Number(sy),Number(dx),Number(dy))

    }
    updatecab(id,X,Y,!status,!curr)
    var arr=sortedcab
    for(var i=0;i<arr.length;i++){
      if(arr[i]._id===id){
        arr[i].status=!status
        arr[i].curr=!curr
        break;
      }
    }
    setSortedcab(arr)
    setst(!st)

  };

  useEffect(()=>{
     console.log("sjhg")
  },[st])

  return (
    <>
    <div className="flex relative flex-col items-center bg-black/30 p-4 rounded-md  h-4/5 w-full pb-10">
    <div className="h-16 w-full flex items-center justify-start">
      <div className="text-white font-bold text-xl mb-2">Curr rides</div>
    </div>
    <div className="relative w-full mb-4 p-6 bg-black/30 rounded-md flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-black/60">
      {sortedcab.map((element, key) => {
        return (
          <div
            key={key}
            className={`pb-2 ${
              element.status && element.curr ? "block" : "hidden"
            }`}
          >
            <div className="flex p-4 bg-black/60 border-b-2 text-white text-sm font-bold border-white rounded-md w-full h-16 items-center justify-between">
              <div className="flex items-center cursor-pointer px-2">
                <FontAwesomeIcon icon={faCarAlt} className="mx-3 h-6 w-6"/>
                <div className="font-bold text-lg sm:text-xl">
                  <p className="cursor-pointer">{element.D_name}</p>
                </div>
              </div>
              <div>
                Location: {element.X}, {element.Y}
              </div>
              <div className="flex-col flex items-center justify-between">
                <div className="text-sm">Arrives in: {element.time} min</div>
                <div className="text-sm">Reached destination in: {element.t} min</div>
              </div>
              <button
                disabled={false}
                className={`bg-black/70 text-white border-2 w-32 border-white p-2 rounded-md hover:scale-105 ${
                  element.status && !element.curr ? "hidden" : "block"
                }`}
                onClick={()=>{handleClick(element._id,element.D_name,element.X,element.Y,element.status,element.curr)}}
              >
                {element.curr ? "Cancel" : "Book"}
              </button>
              <button
                disabled={true}
                className={`bg-black/70 text-white border-2 w-32 border-white p-2 rounded-md  ${
                  !element.status || element.curr ? "hidden" : "block"
                }`}
              >
                Busy
              </button>
            </div>
          </div>
        );
      })}
    </div>
    <div className="h-16 w-full flex items-center justify-start">
      <div className="text-white font-bold text-xl mb-2">New rides</div>
    </div>
    <div className="relative w-full bg-black/30 p-6 rounded-md flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-black/60">
      {sortedcab.map((element, key) => {
        return (
          <div key={key} className={`pb-2 ${(!element.status || !element.curr) ? "block" : "hidden"}`}>
            <div className="flex p-4 bg-black/60 border-b-2 text-white text-sm font-bold border-white rounded-md w-full h-16 items-center justify-between">
              <div className="flex items-center cursor-pointer px-2">
                <FontAwesomeIcon icon={faCarAlt} className="mx-3 h-6 w-6" />
                <div className="font-bold text-lg sm:text-xl">
                  <p className="cursor-pointer">{element.D_name}</p>
                </div>
              </div>
              <div>
                Location: {element.X}, {element.Y}
              </div>
              <div className="flex-col flex items-center justify-between">
                <div className="text-sm">Arrives in: {element.time} min</div>
                <div className="text-sm">Reached destination in: {element.t} min</div>
              </div>
              <button
                disabled={false}
                className={`bg-black/70 text-white border-2 w-32 border-white hover:size-105 p-2 rounded-md hover:scale-105 ${
                  element.status && !element.curr ? "hidden" : "block"
                }`}
                onClick={()=>{handleClick(element._id,element.D_name,element.X,element.Y,element.status,element.curr)}}
              >
                {element.curr? "Cancel" : "Book"}
              </button>
              <button
                disabled={true}
                className={`bg-black/70 text-white border-2 w-32 border-white p-2 rounded-md  ${
                  (!element.status || element.curr) ? "hidden" : "block"
                }`}
              >
                Busy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
    
    </>
  );
};

export default Info;

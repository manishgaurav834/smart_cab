import React, { useState, useContext, useEffect } from 'react';
import tripContext from '../context/tripcontext';
import authContext from '../context/authcontext';
import cabContext from '../context/cabcontext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarAlt } from '@fortawesome/free-solid-svg-icons';

const Info = (props) => {
  const { name, time, X, Y, status, sx, sy, dx, dy, id, onStatusChange, isBooked, t } = props;
  const context = useContext(tripContext);
  const context1 = useContext(authContext);
  const { success } = context1;
  const { addtrip } = context;
  const context3 = useContext(cabContext);
  const { updatecab } = context3;
  const navigate = useNavigate();

  const [st, setSt] = useState(status);
  const [booked, setBooked] = useState(isBooked);

  const handleClick = (e) => {
    e.preventDefault();
    if (!booked) {
      addtrip(name, sx, sy, dx, dy);
    }

    const newSt = !st;
    const newBooked = !booked;

    setSt(newSt);
    setBooked(newBooked);

    setTimeout(() => {
      updatecab(id, X, Y, newSt, newBooked);
      onStatusChange(id, newSt, newBooked);
    },);

    console.log(newSt, newBooked);
  };

  return (
    <div className="flex p-4 bg-black/60 border-2 text-white text-sm font-bold border-white rounded-md w-full h-16 items-center justify-between">
      <div className="flex items-center cursor-pointer px-2">
        <FontAwesomeIcon icon={faCarAlt} className="mx-3 h-6 w-6" />
        <div className="font-bold text-lg sm:text-xl">
          <p className="cursor-pointer">{name}</p>
        </div>
      </div>
      <div>Location: {X}, {Y}</div>
      <div className="flex-col flex items-center justify-between">
        <div className='text-sm'>Arrives in: {time} min</div>
        <div className='text-sm'>Reached destination in: {t} min</div>
      </div>
      <button
        disabled={false}
        className={`bg-black/70 text-white border-2 w-32 border-white p-2 rounded-md ${(st && !booked) ? 'hidden' : 'block'}`}
        onClick={handleClick}
      >{booked ? 'Book/Cancel' : 'Book/Cancel'}
      </button>
      <button
        disabled={true}
        className={`bg-black/70 text-white border-2 w-32 border-white p-2 rounded-md ${(!st || booked) ? 'hidden' : 'block'}`}
      >Busy
      </button>
    </div>
  );
};

export default Info;

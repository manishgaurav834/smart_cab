import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/authcontext';
import cabContext from '../context/cabcontext';
import tripContext from '../context/tripcontext';
import Nav from './Nav';
import Info from './Info';
import Trip from './Trip';

const Home = () => {
  const context = useContext(authContext);
  const context1 = useContext(cabContext);
  const { allcab, getcabs } = context1;
  const { success, getuser, name } = context;
  const context3 = useContext(tripContext);
  const { gettrips, alltrip } = context3;
  const navigate = useNavigate();

  const [cred, setCred] = useState({ pickupX: '', pickupY: '', destX: '', destY: '' });
  const [sortedcab, setSortedcab] = useState([]);
  const [error, setError] = useState(null);

  function bfsShortestPath(start, end) {
    const numRows = 50;
    const numCols = 50;
    const directions = [
      { dx: -1, dy: 0 }, // up
      { dx: 1, dy: 0 },  // down
      { dx: 0, dy: -1 }, // left
      { dx: 0, dy: 1 }   // right
    ];

    const queue = [{ x: start[0], y: start[1], dist: 0 }];
    const visited = new Set();
    visited.add(`${start[0]}-${start[1]}`);

    while (queue.length > 0) {
      const current = queue.shift();
      const { x, y, dist } = current;

      if (x === end[0] && y === end[1]) {
        return dist;
      }

      for (const direction of directions) {
        const newX = x + direction.dx;
        const newY = y + direction.dy;

        if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols && !visited.has(`${newX}-${newY}`)) {
          queue.push({ x: newX, y: newY, dist: dist + 1 });
          visited.add(`${newX}-${newY}`);
        }
      }
    }

    return -1;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = [];
    for (var i = 0; i < allcab.length; i++) {
      var obj = {
        curr: allcab[i].curr,
        _id: allcab[i]._id,
        D_name: allcab[i].D_name,
        X: allcab[i].X,
        Y: allcab[i].Y,
        status: allcab[i].status,
        t:bfsShortestPath([Number(cred.destX),Number(cred.destY)], [Number(cred.pickupX), Number(cred.pickupY)]),
        time: bfsShortestPath([allcab[i].X, allcab[i].Y], [Number(cred.pickupX), Number(cred.pickupY)])
      };
      arr.push(obj);
    }
    arr.sort((a, b) => a.time - b.time);
    setSortedcab(arr);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!success) {
      navigate("/login");
    } else {
      getuser().catch(err => setError(err.message));
      getcabs().catch(err => setError(err.message));
    //   await console.log(allcab)
      gettrips().catch(err => setError(err.message));
    }
  }, [success]);

  
  

  const handleStatusChange = (id, newStatus, newIsBooked) => {
    var arr=sortedcab;
    for(var i=0;i<arr.length;i++){
      if(arr[i]._id===id){
        arr[i].status=newStatus
        arr[i].curr=newIsBooked
        arr[i].isBooked=newIsBooked
        break;
      }
    }
    setSortedcab(arr);
  };

  return (
    <>
      <div className={`relative bg-bg2 bg-top-right bg-cover flex flex-col h-screen overflow-y-hidden `}>
        <Nav name={name} />
        <div className="mx-auto flex items-start justify-between my-5 left-0 right-0 h-[90%] absolute top-16 w-[90%]">
          <div className="relative flex flex-col items-center justify-between w-3/5 pb-10  h-full mr-4">
            <div className="container  mx-auto flex items-start justify-center p-6 w-[90%]  bg-black/60 rounded-md mb-2">
              <form onSubmit={handleSubmit} className="flex w-full justify-between items-center">
                <div className='flex flex-col items-center justify-between w-1/2 h-24'>
                <div className="flex items-center justify-start w-full mb-1">
                <div className="text-white text-md font-bold">Pickup:</div>
                </div>
                  <input
                    type="number"
                    id="pickupX"
                    placeholder="Enter Pickup-X"
                    name="pickupX"
                    className="text-white border-b-2 focus:border-0 focus:text-white border-white bg-black/80 w-full h-8 p-2 mx-2 mb-2"
                    onChange={handleChange}
                    value={cred.pickupX}
                  ></input>
                  <input
                    type="number"
                    id="pickupY"
                    placeholder="Enter Pickup-Y"
                    name="pickupY"
                    className="text-white border-b-2 focus:border-0 focus:text-white border-white bg-black/80 w-full h-8 p-2 mx-2"
                    onChange={handleChange}
                    value={cred.pickupY}
                  ></input>
                </div>
                <div className='flex flex-col items-center justify-between w-1/2 h-24 mx-4'>
                <div className="flex items-center justify-start w-full mb-1">
                <div className="text-white text-md font-bold">Destination:</div>
                </div>
                  <input
                    type="number"
                    id="destX"
                    placeholder="Enter destination-X"
                    name="destX"
                    className="text-white border-b-2 focus:border-0 focus:text-white border-white bg-black/80 w-full h-8 p-2 mx-2 mb-2"
                    onChange={handleChange}
                    value={cred.destX}
                  ></input>
                  <input
                    type="number"
                    id="destY"
                    placeholder="Enter destination-Y"
                    name="destY"
                    className="text-white border-b-2 focus:border-0 focus:text-white border-white bg-black/80 w-full h-8 p-2 mx-2"
                    onChange={handleChange}
                    value={cred.destY}
                  ></input>
                </div>
                <input
                  type="submit"
                  value="Search"
                  className="bg-black/50 text-white hover:scale-105 hover:opacity-95 cursor-pointer font-bold sm:text-xl mx-2 border-2 border-white rounded-md w-32 p-1 h-10"
                ></input>
              </form>
              
            </div>
            <Info sx={cred.pickupX} sy={cred.pickupY} dx={cred.destX} dy={cred.destY} sortedcab={sortedcab} setSortedcab={setSortedcab}/>
          </div>
          <div className="bg-black/50 p-4 rounded-md relative h-[95%] w-2/5 flex flex-col items-center scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-black/60 overflow-y-auto">
            <div className="text-white font-bold text-2xl w-full h-16 pt-4 border-b-2 border-b-white text-center"> LAST RIDES </div>
            {error && <div className="text-red-500">{error}</div>}
            {alltrip.map((element, key) => {
              return (
                <div className="text-white" key={key}>
                  <Trip name={element.D_name} sx={element.startX} sy={element.startY} dx={element.destinationX} dy={element.destinationY} date={element.date} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

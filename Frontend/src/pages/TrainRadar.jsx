import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function TrainRadar() {

const[radars,setRadars] = useState([])

useEffect(()=>{
  loadRadars();
},[]);


const loadRadars = async() =>{
  const result = await axios.get("http://localhost:8080/radars");
  setRadars(result.data);
  
};

const deleteRadar = async(id)=>{
  await axios.delete(`http://localhost:8080/radar/${id}`)
  loadRadars()
}

 const getTrainDetails = async (trainId) => {
    // Fetch train details based on the trainId
    const trainResult = await axios.get(`http://localhost:8080/train/${trainId}`);
    return trainResult.data;
  };



  return (
    <div>
       <h1 className="display-5 fw-bold" style={{textAlign : "center", margin: "10px"}}>Train Radar</h1>


       <div style={{display : "flex",justifyItems: "center" , justifyContent: "space-between"}}>
 <h1 className="display-5 fw-bold" style={{textAlign : "center"}}>TRAIN RADAR</h1>
 <Link   style = {{maxHeight : "45px" , justifyItems:"center",paddingTop : "10px"}} className='btn btn-primary' to={"/addRadar"}>
      Add Radar
  </Link>
 </div>

      <div className='table-reponsive small' style={{display : "flex", justifyContent:"center"}}>

         
<table className='table table-striped-sm '>
        <thead>
    <tr>
      <th scope='col'>Radar No</th>
      <th scope='col' >Train No</th>
      <th scope='col'>Last Updated Station</th>
      <th scope='col'>Last Updated Time</th>
      
      <th scope='col'></th>
    </tr>
  </thead>
  <tbody>
{
  radars.map((radar,index)=>(
    <tr style={{height : "50px", padding : "15px"}}>

    <td>{radar.id}</td>
    <td>{radar.trainId}</td>
    <td>{radar.lastUpdatedStation}</td>
    <td>{radar.lastUpdatedTime}</td>
    <td>
    <Link   className='btn btn-outline-primary mx-2' to={`/editRadar/${radar.id}`}>Edit</Link> 
   <button  className='btn btn-danger mx-2' onClick={()=> deleteRadar(radar.id)}>Delete</button>
     
    </td>

  
    
    
   </tr>

  
    
  ))
}



   
 
  </tbody>
</table>

</div>
      </div>
  
  )
}

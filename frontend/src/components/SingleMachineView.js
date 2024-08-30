import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


export default function SingleMachineView() {
    const [machineData, setMachineData] = useState([]);
    const [repairData, setRepairData] = useState([]);

    const {id, mid} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/machine/${id}`).then((res)=>{
            setMachineData(res.data);
            console.log(res.data);
        })
        axios.get(`http://localhost:8070/repair/${mid}`).then((res)=>{
          setRepairData(res.data);
          console.log(res.data);
      })
    }, [id, mid]);

  return (
    
      <>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Machine ID {mid}</div>
                <a href={`/repair/add/${mid}`}><button className="btn btn-primary">Add New Record</button></a>
            </div>
            <br/>
            <table className="table table-bordered table-striped">
                <thead className="table-header">
                    <tr>
                        <th>Repair Start Date</th>
                        <th>Part Name</th>
                        <th>Repair End Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {repairData.map((rec) => (
                        <tr key={rec.id}>
                            <td>{rec.repairStartDate}</td>
                            <td>{rec.partName}</td>
                            <td>{rec.repairEndDate}</td>
                            <td>{rec.discription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </>
  
    
  )
}

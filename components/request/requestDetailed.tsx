import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function RequestDetailed({req,user,resetNumber}:any){
    const [handlerActive, setHandlerActive] = useState(false);
   
    const handleApprove =()=>{
        if(handlerActive) return;
        req.resolvedBy = user.email;
        axios({
            url:'https://admin-panel-adilovicc.vercel.app/api/db_handler/updateRequest',
            data:{
             request: JSON.stringify(req),
             email: user.email
            },
            method:'POST'
          }).then((res)=>{
                if(res){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Request Approved',
                    showConfirmButton: true,
                    timer: 5000
                 });  
                 req.status='approved';
                 resetNumber(0);
                 setHandlerActive(false);
                };
          }).catch((err)=>{
            Swal.fire({
              position: 'bottom-right',
              icon: 'error',
              title: 'Something went wrong',
              showConfirmButton: false,
              timer: 2500
           });  
           setHandlerActive(false);
          });
    }
    return(
        <div id="reqDetailed" className="w-[90%] p-2 max-w-[500px] border-[0.5px] border-black/20 shadow-md rounded-lg overflow-x-auto h-[450px] flex flex-col bg-white">
              <div className="flex justify-center"><span className="p-2 font-semibold font-serif">Request ID: {req.id}</span></div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                  <div className="flex items-center">
                    <span className="first-letter:capitalize">{req.status}</span>
                    <div className={`w-4 h-4 rounded-full ml-2 ${req.status == "pending" ? 'bg-yellow-500' : req.status == "approved" ? 'bg-green-600' : 'bg-red-700'}`}></div>
                  </div>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created at:</span>
                <span>{req.createdTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Author:</span>
                <span>{req.author.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{req.author.email}</span>
              </div>
              <br></br>
              <hr></hr>
              <div className="flex justify-between">
                <span className="font-semibold">RIB:</span>
                <div className="flex">
                 {req.rib_limit != req.crt_rib_limit ? 
                 (<div className="flex items-center"><span>{req.crt_rib_limit}</span>{`>>`}
                 <span className="font-semibold">{req.rib_limit}</span></div>) : req.rib_limit}
                </div>
              </div>
              <div className="flex justify-between">
              <span className="font-semibold">RMB:</span>
                <div className="flex">
                 {req.rmb_limit != req.crt_rmb_limit ? 
                 (<div className="flex items-center"><span>{req.crt_rmb_limit}</span>{`>>`}
                 <span className="font-semibold">{req.rmb_limit}</span></div>) : req.rmb_limit}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">CIB:</span>
                  <div className="flex">
                   {req.cib_limit != req.crt_cib_limit ? 
                   (<div className="flex items-center"><span>{req.crt_cib_limit}</span>{`>>`}
                   <span className="font-semibold">{req.cib_limit}</span></div>) : req.cib_limit}
                  </div>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">CMB:</span>
                   <div className="flex">
                    {req.cmb_limit != req.crt_cmb_limit ? 
                    (<div className="flex items-center"><span>{req.crt_cmb_limit}</span>{`>>`}
                    <span className="font-semibold">{req.cmb_limit}</span></div>) : req.cmb_limit}
                </div>
              </div>
              <hr></hr>
              <br></br>
              {req.status!='pending' ?
              <div className="w-full">
                <div className="flex justify-between">
                    <span className="font-semibold">Resolved by:</span>
                    <span>{req.resolvedBy}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Resolved at:</span>
                    <span>{req.resolvedTime}</span>
                </div>
                {req.status==='rejected' && 
                    <div className="w-full border-[0.5px] border-black/10 p-2 text-sm">
                       <span className="font-semibold">Reason:</span>
                       <span>{req.rejectedReason}</span>
                    </div>}
              </div> :
              user.role == 'admin' ? 
              <div className="w-full flex justify-center flex-wrap">
                  <button className={`${!handlerActive ? 'hidden' : 'grow'} px-3 py-1 h-8 animate-pulse text-white font-serif text-bold bg-black/80 rounded-lg mx-2`}></button>
                  <button onClick={()=>{handleApprove()}} className={`${handlerActive ? 'hidden' : 'grow'} px-3 py-1 text-white font-serif  text-bold bg-black/80 rounded-lg mx-2`}>Approve</button>
                  <button className={`${!handlerActive ? 'hidden' : 'grow'} px-3 h-8 py-1 animate-pulse text-white font-serif text-bold bg-black/80 rounded-lg mx-2`}></button>
                  <button className={`${handlerActive ? 'hidden' : 'grow'} px-3 py-1 text-white font-serif  text-bold bg-black/80 rounded-lg mx-2`}>Reject</button>
              </div> : 
              <div>
                  <button className="px-3 py-1 text-white font-serif grow text-bold bg-black/80 rounded-lg mx-2">Edit</button>
              </div>
              }
              <div className="w-full border-[0.5px] mt-6 border-black/10 text-black/60">
                  <div className="flex justify-between"><span className="font-serif text-xs font-bold">RIB-</span> <span className="font-serif text-xs">RIB Limit (Per Day)</span></div>
                  <div className="flex justify-between"><span className="font-serif text-xs font-bold">RMB-</span> <span className="font-serif text-xs">RMB Limit (Per Day)</span></div>
                  <div className="flex justify-between"><span className="font-serif text-xs font-bold">CIB-</span> <span className="font-serif text-xs">CIB Limit (Per Transaction)</span></div>
                  <div className="flex justify-between"><span className="font-serif text-xs font-bold">CMB-</span> <span className="font-serif text-xs">CMB Limit (Per Transaction)</span></div>
              </div>

        </div>
    )
}
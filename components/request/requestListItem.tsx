
import fullScr from '../../public/fullScr.png'
import Image from 'next/image'

export default function RequestListItem(props:{req:any,handleFullScreen:any}){
    
    return(
        <div className="w-full h-14 px-2 border-[1px] border-black/10 rounded-sm flex justify-between items-center overflow-hidden md:cursor-pointer">
           <div className="h-full flex justify-center items-center relative ">
               <div className={`absolute left-1 h-5 w-5 ${props.req.status === 'pending' ? "bg-yellow-500" : props.req.status === 'approved' ? "bg-green-500" : "bg-red-500"  } rounded-full`}></div>
               <div className={`absolute left-1 h-5 w-5 animate-ping-slow ${props.req.status === 'pending' ? "bg-yellow-600" : props.req.status === 'approved' ? "bg-green-600" : "bg-red-600"  }  rounded-full`}></div>
           </div>
           <span className={`text-sm`}>RIB: {props.req.rib_limit}</span>
           <span className={`text-sm`}>RMB: {props.req.rmb_limit}</span>
           <span className={`text-sm`}>CIB: {props.req.cib_limit}</span>
           <span className={`text-sm`}>CMB: {props.req.cmb_limit}</span>
           <div onClick={()=>props.handleFullScreen()}  className="w-6 h-6 relative">
                 <Image src={fullScr} fill alt="fullScr"></Image>
           </div>
          
        </div>
    )

}
import { getSession } from "next-auth/react";
import prisma from "../lib/prismadb";
import { ArrowUturnLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon} from '@heroicons/react/24/outline'
import RequestListItem from '../components/request/requestListItem'
import Image from "next/image";
import {useState,useEffect, useCallback, useRef} from 'react'
import Switch from "@mui/material/Switch";
import axios from "axios";
import useRequests from '../hooks/useRequests'
import svgSpinner from '../public/spinner.svg'
import RequestDetailed from '../components/request/requestDetailed'
import $ from 'jquery'
import { PrismaClient } from '@prisma/client'
import {useRouter} from "next/router";

export default function LimitMaintenance({session,user}:any){
    const [checkedAll, setChecked] = useState(true);
    const [checkedPending, setCheckedPending] = useState(true);
    const [checkedRejected, setCheckedRejected] = useState(true);
    const [checkedApproved, setCheckedApproved] = useState(true);
    const [requestsBatch, setRequestsBatch] = useState(0);

    const [selectedRequest, setSelectedRequest] = useState<any>();

    const router = useRouter();

    const [queryString, setQueryString] = useState({
        pending: "pending",
        rejected: "rejected",
        approved: "approved"
      })

      useEffect(()=>{
       setRequestsBatch(0);
    },[queryString,checkedAll])

    const {requests, loading, isMore} = useRequests(requestsBatch, queryString.pending, queryString.rejected, queryString.approved);
    
    const handleChangeAll =()=>{
        if(checkedAll){
            setQueryString({pending:'cnjinisadua', rejected:'jiasasdjadn', approved:'iajfniasndfis'});
            setCheckedApproved(false);
            setCheckedPending(false);
            setCheckedRejected(false);
        }
        else{
            setQueryString({
                pending: "pending",
                rejected: "rejected",
                approved: "approved"
              });
              setCheckedApproved(true);
            setCheckedPending(true);
            setCheckedRejected(true);
        }
        setChecked(prevChecked=> !prevChecked);
    }

    const handleChangePending=()=>{
        if(checkedPending){
            setQueryString(prevQuery=>({
                ...prevQuery,
                pending:'wetwetrt'
            }));
            if(checkedAll) setChecked(false);
            setCheckedPending(false);
        }
        else{
            setQueryString(prevQuery=>({
                ...prevQuery,
                pending:'pending'
            })); 
            if(checkedApproved && checkedRejected) setChecked(true);
            setCheckedPending(true);
        }
        
    }

    const handleChangeRejected=()=>{
        if(checkedRejected){
            setQueryString(prevQuery=>({
                ...prevQuery,
                rejected:'wetwetrt'
            }));
            if(checkedAll) setChecked(false);
            setCheckedRejected(false);
        }
        else{
            setQueryString(prevQuery=>({
                ...prevQuery,
                rejected:'rejected'
            })); 
            if(checkedApproved && checkedPending) setChecked(true);
            setCheckedRejected(true);
        }
    }
    const handleChangeApproved=()=>{
        if(checkedApproved){
            setQueryString(prevQuery=>({
                ...prevQuery,
                approved:'wetwetrt'
            }));
            if(checkedAll) setChecked(false);
            setCheckedApproved(false);
        }
        else{
            setQueryString(prevQuery=>({
                ...prevQuery,
                approved:'approved'
            })); 
            if(checkedRejected && checkedPending) setChecked(true);
            setCheckedApproved(true);
        }
    }

    const observer = useRef();
    const lastElementView = useCallback((node:any)=>{
        if(loading) return
        if(!isMore) return
       //@ts-ignore
        if(observer.current) observer.current.disconnect()
        //@ts-ignore
        observer.current = new IntersectionObserver(entries => {
          if(entries[0].isIntersecting){
           setRequestsBatch(prevRequests=>prevRequests+3);
          }
        })
        //@ts-ignore
        if(node) observer.current.observe(node);
     }, [loading, isMore]);
   
    const handleSelectRequest = (req:any) =>{
        setSelectedRequest(req);
    }

    

    const fullScrRef = useRef(false);
    const safetyRef = useRef(false);
    const [flScr, setFlScr] = useState(true);
      function detailedMode(){
        console.log("OVO!!!!");
        $('#fullScreenElement').css('display','flex');
        fullScrRef.current=true;
      }

     useEffect(()=>{
        
        const handleDetailedClick =(event:any)=>{
            console.log("OVDJEEE SMOOOO::::");
            console.log(fullScrRef.current+"jee");
             if(fullScrRef.current && safetyRef.current && !event.target.closest("#reqDetailed")){
                 fullScrRef.current=false;
                 safetyRef.current=false;
                 $('#fullScreenElement').css('display','none');
             }
            if(fullScrRef.current){ safetyRef.current=true; console.log("DETAILED JE AKTIVAN");}
        }

       document.addEventListener("click",handleDetailedClick);
        
       return()=>{
         document.removeEventListener("click",handleDetailedClick);
       }

     })

    return(
        <div className="relative w-full h-screen flex flex-col-reverse sm:flex-row overflow-y-hidden">
            <div id="fullScreenElement" className={`hidden top-0 right-0 bottom-0 left-0 fixed justify-center items-center bg-black/30 backdrop-blur-lg z-20`}>
               { selectedRequest && <RequestDetailed req={selectedRequest} resetNumber={setRequestsBatch} user={user}></RequestDetailed>}
            </div>
            <section className="left w-full sm:w-[20%] h-[10%] flex items-center justify-evenly sm:inline-block sm:h-screen sm:border-r-[0.5px] border-black/40">
                 <div className="hidden sm:flex items-center justify-center p-3 sm:py-6 rounded-full sm:rounded-none bg-[rgba(12,12,12,0.3)] transition duration-300 sm:p-0">
                       <div className="relative h-8 w-8">
                       { user.image ? <img alt='profile_image' src={user.image} className="w-7 h-7 rounded-full"></img> : <UserCircleIcon />}
                       </div>
                       <p>{user.name}</p>
                 </div>
                 <div onClick={()=>router.push('/')} className="cursor-pointer flex items-center justify-start p-3 sm:py-6  sm:pl-5 rounded-full sm:rounded-none hover:bg-black/20 transition duration-300 sm:p-0">
                    <ArrowUturnLeftIcon className="h-8 w-8 sm:mr-2"></ArrowUturnLeftIcon>
                    <p className="truncate hidden sm:inline-block font-semibold">Go back</p>
                 </div>
                 <div className="cursor-pointer flex items-center justify-start p-[10px] sm:py-6  sm:pl-5 rounded-full sm:rounded-none hover:bg-black/20 transition duration-300 sm:p-0">
                    <PlusCircleIcon className="h-9 w-9 sm:mr-2"></PlusCircleIcon>
                    <p className="truncate hidden sm:inline-block font-semibold">Add request</p>
                 </div>
            </section>
            <section className="relative central grow h-screen overflow-auto">
                  <div className="sticky top-0 w-full h-[170px] z-10">
                    <div className="h-[120px] bg-[rgb(248,247,247)] w-full flex flex-col justify-around items-center">
                      <p>Here is the list of all the requests you have created</p>
                      <div className=" w-full flex justify-evenly items-center flex-wrap">
                       <div className="flex items-center">
                        <span className="font-serif text-sm">All</span>
                         <Switch
                           checked={checkedAll}
                           onChange={handleChangeAll}
                           inputProps={{ 'aria-label': 'controlled' }}
                          />
                       </div>
                       <div className="flex items-center">
                        <span className="font-serif text-sm">Pending</span>
                        <Switch
                         checked={checkedPending}
                         onChange={handleChangePending}
                         inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </div>
                        <div className="flex items-center">
                        <span className="font-serif text-sm">Approved</span>
                        <Switch
                         checked={checkedApproved}
                         onChange={handleChangeApproved}
                         inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </div>
                        <div className="flex items-center">
                        <span className="font-serif text-sm">Rejected</span>
                         <Switch
                         checked={checkedRejected}
                         onChange={handleChangeRejected}
                         inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </div>
                       </div>
                    </div>
                    <div className="h-[40px] backdrop-blur-md w-full"></div>
                 </div>
                 <div className="p-5">
                    {requests.map((req,i)=>(
                       i+1 == requests.length ?  
                        <div key={i} className="w-full" onClick={()=>handleSelectRequest(req)}><RequestListItem  req={req} handleFullScreen={detailedMode}></RequestListItem></div>
                       :  <div key={i} className="w-full" ref={lastElementView} onClick={()=>handleSelectRequest(req)}><RequestListItem  req={req} handleFullScreen={detailedMode}></RequestListItem></div>
                    ))
                    }
            
                    {loading && <div className="w-full flex justify-center"><div className="w-16 h-16 relative animate-spin"><Image fill src={svgSpinner} alt="spinner"></Image></div></div>}
                   
                 </div>
                  
            </section>
            <section className="right hidden w-[28%] md:flex pt-20 border-l-[0.5px] border-black/40 justify-center">
                 {selectedRequest ? 
                 <RequestDetailed req={selectedRequest} user={user} resetNumber={setRequestsBatch}></RequestDetailed> : 
                 <span>Select request to show details!</span>}
            </section>
        </div>
    )
}


export const getServerSideProps = async (context:any) =>{
    const session = await getSession(context);
    
    if(!session) return {
        redirect:{
            destination:'/',
            permanent:false
        }
    }
    const pcl = new PrismaClient();
    
    const user = await pcl.user.findUnique({
         where:{
            //@ts-ignore
            email: session.user?.email
         }
    })

    return{
      props: {
          session,
          user
      }
    }
}
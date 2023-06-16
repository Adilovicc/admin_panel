import { useEffect, useState } from "react";
import axios from 'axios';


export default function useRequests(records:number, pending:string, rejected:string, approved:string){
    const [requests, setRequests] = useState([]);
    const [isMore, setIsMore] = useState(true);
    const [startLoadingAt, setStartAt] = useState(0);
    const [numberOfRequests, setNumberOfRequests] = useState(0);
    const [loading, setLoading] =useState(false);
    useEffect(()=>{
        setRequests([]);
        setNumberOfRequests(0);
        setIsMore(true);
        setStartAt(0);
    },[pending,rejected,approved])

    useEffect(()=>{
          console.log("PENDING JE" +pending)
          let cancel: () => void = () => {};
            setLoading(true);
            try {
              axios({
                method:'GET',
                url: `http://localhost:3000/api/db_handler/getRequests`,
                params: {
                    startAt: records,
                    pending:pending,
                    rejected:rejected,
                    approved:approved
                },
                cancelToken: new axios.CancelToken(c=>cancel=c)
              }).then(res => {
               
                if(res.data.length<3) setIsMore(false);
                // setStartAt(startLoadingAt+res.data.length);
                setNumberOfRequests(numberOfRequests+res.data.length);
                //@ts-ignore 
                setRequests(prevData=>[...prevData,...res.data]);
                setLoading(false);
              }).catch(
                err=> {
                    if(axios.isCancel(err)) return
                }
              )
              
            } catch (error) {
             
            }
          
         return ()=> cancel(); 
    }, [pending,rejected,approved, records])
    return {requests, loading, isMore, numberOfRequests}
}
//then((response)=>{response.json().then(data=>{return data})})
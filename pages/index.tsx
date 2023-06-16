import { getSession, signOut } from "next-auth/react";
import Signin from '../components/signin';
import Animation from '../public/Animation.json';

import limitIcon from '../public/limitIcon.png'
import maintenanceIcon from '../public/maintenanceIcon.png'
import Image from 'next/image'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import {useRouter} from "next/router";

export default function Home({session}:any) {
    const router = useRouter()
   
    return(
        <div className="relative h-screen w-full overflow-x-hidden">
           { /* <Lottie className="absolute w-full h-screen" animationData={Animation} /> */ }
            <div className="h-[72%] w-full bg-sky-400 flex flex-col items-center justify-end ">
                    {
                        !session ? 
                        (<section className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
                             <Signin></Signin>
                        </section>) : 
                        (<section className="fixed top-0 right-0 left-0 bottom-0 flex items-start justify-center">
                               <div className="text-white text-lg absolute top-2 right-5 flex items-center">
                                  <span>Welcome, {session.user.email}</span>
                                  <div onClick={()=>signOut()} className="text-white ml-3 px-4 py-1 hover:bg-[rgba(255,255,255,0.4)] 
                                    rounded-xl border-[0.5px] cursor-pointer transition duration-300
                                   border-black/20 bg-[rgba(255,255,255,0.2)] flex items-center">
                                    <p className="hidden">Sign out</p>
                                     <ArrowLeftOnRectangleIcon className="h-5 w-5"></ArrowLeftOnRectangleIcon>
                                </div>
                               </div>
                               
                               <div className="flex justify-center items-center h-[60%] w-full flex-wrap mt-20 text-lg font-bold">
                                 <div onClick={()=>router.push('/limitMaintenance')} className="w-full max-w-[280px] min-w-[200px] m-2 
                                 cursor-pointer aspect-video bg-white rounded-md border-[0.5px]
                                  border-black/30 flex flex-col items-center justify-center">
                                    <div className="relative h-[60%] aspect-square"><Image src={limitIcon} fill alt='limitIcon'></Image></div>
                                    Limit Maintenance
                                 </div>
                                 <div className="w-full max-w-[280px] min-w-[200px] m-2 cursor-pointer aspect-video
                                  bg-white rounded-md border-[0.5px] border-black/30 flex flex-col items-center justify-center">
                                     <div className="relative h-[60%] aspect-square"><Image src={maintenanceIcon} fill alt='maintenanceIcon'></Image></div>
                                    System Maintenance
                                 </div>
                               </div>
                        </section>)
                    }
            </div>
            <div className="h-[28%] w-full bg-cyan-800">

            </div>
        </div>
    )
}



export const getServerSideProps = async (context:any) =>{
      const session = await getSession(context);
      
      return{
        props: {
            session
        }
      }
}
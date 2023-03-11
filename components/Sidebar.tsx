'use client'
import { useSession,signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { collection } from 'firebase/firestore'
import {useCollection } from 'react-firebase-hooks/firestore'
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

const Sidebar = () => {
  const{data: session} = useSession();

  const[chats , loading , error] = useCollection(
    session && collection(db, "users", session?.user?.email!, "chats")
    )

  return (
    <div className="p-2 flex flex-col  h-screen">
        <div className="flex-2 bottom-0"><NewChat/></div>

        <div className="hidden sm:inline">
          <ModelSelection/>
        </div>
          <div className="flex-1 top-0 flex-col space-y-2 my-2">
          {loading && (
            <div className="animate-pulse text-center text-white"><p>Loading chats....</p></div>
          )}

            {chats?.docs.map(chat=>(
              <ChatRow key={chat.id} id={chat.id}/>
              ))} 
              </div>

              <div className="flex ">

        {session && (
          
          <img onClick={()=> signOut()} src={session.user?.image!} alt="img" className="h-12 w-12 rounded-full hover:opacity-50 cursor-pointer mx-auto mb-2"/>
          )}
    </div>
          </div>
  )
}

export default Sidebar

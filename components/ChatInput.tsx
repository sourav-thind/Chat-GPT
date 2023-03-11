'use client'
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";

type Props={
    chatId:string;
}
const ChatInput = ({chatId}:Props) => {
  const [prompt, setPrompt] = useState("");
  const {data:session } = useSession();
  //TODO useSWR to get models
  // const {data: model , mutate : setModel} = useSWR("model" , 
  //   {
  //       fallbackData: 'text-davinci-003'
  //   })
  const model = 'text-davinci-003';

  const sendMessage = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message : Message ={
      text : input,
      createdAt : serverTimestamp(),
      user :{
        _id : session?.user?.email!,
        name :session?.user?.name!,
        avatar:session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name }`
      }
    }
    await addDoc(collection(db, "users" , session?.user?.email! , "chats", chatId, "messages"),
    message)

    //toast notification for loading
    const notification = toast.loading('ChatGPT is thinking...');

    await fetch('/api/askQuestions', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        prompt:input,chatId, model, session
      }),
    }).then(()=>{
      // toast notification to sucessful
      toast.success('ChatGPT has responsed.' , {id: notification})
    })

  }
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm focus:outline-none">
     <form onSubmit={sendMessage} className="p-5 space-x flex">
        <input 
        className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
        disabled={!session}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
         type="text" placeholder="Type Your message here..."/>
        <button type="submit" disabled={!prompt || !session} className="hover:bg-gray-900 font-bold px-3 py-2 rounded disabled:bg-gray-600 disabled:cursor-not-allowed">
            <PaperAirplaneIcon className="w-5 h-5 -rotate-45"/>
        </button>
        </form> 
    </div>
  )
}

export default ChatInput

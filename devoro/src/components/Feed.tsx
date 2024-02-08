import useFirestore from '../../hooks/useFirestore'
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoBookmarks } from "react-icons/io5";
import avatar from '../assets/avatar.png'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from './ui/toast';



export default function Feed() {
  const { allPost, user } = useFirestore();
  const { toast } = useToast()

  const deletePost = async (id: string) => {
    const q = query(collection(db, "posts"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const postData = { id: doc.id, ...doc.data() };
      localStorage.setItem('deletedPost', JSON.stringify(postData));
      deleteDoc(doc.ref);
    });
  }
  
  const undoDelete = async () => {
    const deletedPostString = localStorage.getItem('deletedPost');
    if (deletedPostString) {
      let deletedPost = JSON.parse(deletedPostString);
      deletedPost.timestamp = serverTimestamp();
      await setDoc(doc(db, 'posts', deletedPost.id), deletedPost);
    }
  };

    return (
      <div className='z-49 w-[95%]'>
        {allPost.map((posts) => (
          <>
          <div key={posts.id}>
            <div className='flex flex-col gap-2 mb-5 mt-2 bg-slate-200/40 px-5 py-5 rounded-xl'>
              <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                  <img src={posts.photoURL as string} className='size-11 rounded-full'/>
                  <span className='text-black/60'>{posts.username}</span>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <BsThreeDots className='size-6 hover:text-purple-900 cursor-pointer'/>
                  </PopoverTrigger>
                  <PopoverContent className='w-28 rounded-xl bg-white'>
                    {posts.uid === user?.uid 
                    ? 
                    <div className='flex flex-col gap-1'>
                      <button className='hover:bg-slate-500 hover:text-white px-2 py-1 rounded-[5px] cursor-pointer flex gap-1 items-center'>
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => {deletePost(posts.id as string); toast({ title: "Post Deleted", description: "Do you want to undo this action?", action: (<ToastAction onClick={() => undoDelete()} altText="undo post">Undo</ToastAction> ),}) }} 
                        className='hover:bg-red-700 hover:text-white px-2 py-1 rounded-[5px] cursor-pointer flex gap-1 items-center'>
                        <FaTrashCan />
                        <span>Delete</span>
                      </button>
                    </div> 
                    : 
                    <button className='hover:bg-slate-500 hover:text-white px-3 py-1 rounded-[5px] cursor-pointer flex gap-1 items-center mx-auto'>
                      <IoBookmarks />
                      <span>Save</span>
                  </button>}
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex flex-col gap-5 px-14'>
                <span className='break-all'>{posts.text}</span>
                <img src={posts.image} className='w-full rounded-xl'/>
              </div>
              <div className='flex items-center justify-center gap-12  mt-2'>
                <div className='flex items-center gap-1 hover:text-purple-800 px-2 py-2 hover:bg-violet-200/60 rounded-full cursor-pointer'>
                  <BiRepost className='size-6  cursor-pointer'/>
                  <span className='text-sm'>56</span>
                </div>
                <div className='flex items-center gap-1 hover:text-green-800 px-3 py-2.5 hover:bg-green-200/60 rounded-full cursor-pointer'>
                  <FaRegComment className='size-4'/>
                  <span className='text-sm'>56</span>
                </div>
                <div className='flex items-center gap-1 hover:text-red-800 px-2 py-2 hover:bg-red-300/70 rounded-full cursor-pointer'>
                  <BiRepost className='size-6'/>
                  <span className='text-sm'>56</span>
                </div>
                <div className='flex items-center gap-1 hover:text-purple-800 px-2 py-2 hover:bg-violet-200/60 rounded-full cursor-pointer'>
                  <BiRepost className='size-6'/>
                  <span className='text-sm'>56</span>
                </div>  
              </div>
            </div>
          </div>
          </>
        )).reverse()}
      </div>
    )
  } 

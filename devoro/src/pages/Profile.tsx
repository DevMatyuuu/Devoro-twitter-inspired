import { useRef, useState } from 'react'
import useFirestore from '../../hooks/useFirestore'
import { LuImagePlus } from "react-icons/lu";
import { Tooltip } from '@material-tailwind/react';
import { BsThreeDots } from 'react-icons/bs';
import { BiRepost } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/firebase/firebase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usePostStore from '@/store/postStore';
import Lottie from 'lottie-react';
import loader from '../assets/loading.json'
import useProfileStore from '@/store/profileStore';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import noAvatar from '@/assets/avatar.png'
import { useParams } from 'react-router-dom';


export default function Profile() {
  const [url, setUrl]  = usePostStore((state) => [state.url, state.setUrl])
  const [profileLoading, setProfileLoading] = useProfileStore((state) => [state.profileLoading, state.setProfileLoading])
  const [picture, setPicture] = useState<any>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const { allPost, user } = useFirestore()
  const { uid } = useParams();
  const paramsId = uid;


  const specificPost = allPost.filter(posts => posts.uid === user?.uid)

  const filePickerRef = useRef<any>();

  const handleAvatarChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPicture(e.target.files[0]);
      setIsFilePicked(true);
      handleSubmit(e.target.files[0]);
    }
  }

  const handleSubmit = async (picture: File) => {
    if (picture) {
      const imageRef = ref(storage, `images/${user?.uid}`);
      console.log(imageRef)
      await uploadBytes(imageRef, picture)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setProfileLoading(true)
              setUrl(url);
              setProfileLoading(false)
              setIsFilePicked(false);
            })
            .catch((error) => {
              console.log(error.message, 'error getting the image url');
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };


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

  console.log(paramsId)

  const avatar : string = `https://firebasestorage.googleapis.com/v0/b/devoro-412709.appspot.com/o/images%2F${user?.uid}?alt=media&token=a2c256bc-a000-4845-ad55-c0c022f046af`
  
    return (
      <div className='flex flex-col gap-3 w-[90%] mx-auto mt-24 z-40'>
        <h1 className='text-4xl font-bold'>Profile</h1>
        <div className='flex gap-6 border items-center mx-auto w-full border-black/10 rounded-lg px-5 py-10'>
          <div className='flex items-center w-full'>
            <div className='flex relative mx-16'>
              <Avatar className='size-40 shadow-2xl'>
                <AvatarImage src={user?.uid === paramsId ? noAvatar : avatar} alt='avatar'/>
                <AvatarFallback>
                {profileLoading ? (
                  <Lottie animationData={loader} className='h-20 w-20' />
                  ) : (<img src={url as string} className='w-full'/>
                )}
                </AvatarFallback>
              </Avatar>
              <Tooltip content='Upload Image' className='z-50'>
                <button onClick={() => filePickerRef.current.click()} disabled={isFilePicked} className='absolute right-4 bottom-0 py-3 px-3 rounded-full text-white bg-purple-800 hover:bg-purple-500 cursor-pointer z-50'>
                  <LuImagePlus />
                  <input type="file" ref={filePickerRef} onChange={handleAvatarChange} id='file' hidden />
                </button>
              </Tooltip>
            </div>
            <div className='flex flex-col justify-start gap-y-6 w-full'>
              <div className='flex flex-col gap-2  w-[75%]'>
                <span>Name:</span>
                <input type='text' className='py-3 px-4 rounded-lg w-full border border-black/10 bg-black/10' placeholder='Username'/>
              </div>
              <div className='flex flex-col gap-2  w-[75%]'>
                <span>Email:</span>
                <span className='py-4 px-4 rounded-lg w-full border border-black/10 bg-black/15 cursor-default'>
                  <span className='text-black/50'>{user?.email}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
        {specificPost.map((posts) => (
          <div key={posts.id}>
            <div className='flex flex-col gap-2 mb-10 mt-2 bg-slate-200/40 px-5 py-5 rounded-xl'>
              <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                  <img src={url as string} className='size-11 rounded-full'/>
                  <span className='text-black/60'>{posts.username}</span>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <BsThreeDots className='size-6 hover:text-purple-900 cursor-pointer'/>
                  </PopoverTrigger>
                  <PopoverContent className='w-28 rounded-xl bg-white'>
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
        )).reverse()}
        </div>
      </div>
    )
}

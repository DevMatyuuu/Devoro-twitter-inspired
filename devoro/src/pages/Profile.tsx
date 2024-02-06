import { useState } from 'react'
import useFirestore from '../firebase/useFirestore'
import avatar from '../assets/avatar.png'
import { LuImagePlus } from "react-icons/lu";
import { Tooltip } from '@material-tailwind/react';
import { BsThreeDots } from 'react-icons/bs';
import { BiRepost } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';

export default function Profile() {
  const [picture, setPicture] = useState(avatar);
  const { allPost, user } = useFirestore()

  const specificPost = allPost.filter(posts => posts.uid === user?.uid)

    return (
      <div className='flex flex-col gap-3 w-[90%] mx-auto mt-24 z-40'>
        <h1 className='text-4xl font-bold'>Profile</h1>
        <div className='flex gap-6 border items-center mx-auto w-full border-black/10 rounded-lg px-5 py-10'>
          <div className='flex items-center w-full'>
            <div className='flex relative mx-16'>
              <img src={picture} alt='user-image' className='h-44 w-[350px] rounded-full shadow-2xl z-40'/>
              <Tooltip content='Upload Image' className='z-50'>
                <button className='absolute right-4 bottom-0 py-3 px-3 rounded-full text-white bg-purple-800 hover:bg-purple-500 cursor-pointer z-50'>
                  <LuImagePlus />
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
                <div className='flex items-center gap-2'>
                  <img src={avatar} className='size-11'/>
                  <span className='text-black/60'>{posts.username}</span>
                </div>
                <BsThreeDots className='size-6 hover:text-purple-900 cursor-pointer'/>
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

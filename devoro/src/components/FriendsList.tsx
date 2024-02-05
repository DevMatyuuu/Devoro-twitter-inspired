import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import SearchFriend from './SearchFriend';

export default function FriendsList() {
  return (
    <div className='flex-col flex gap-4 w-full items-center bg-slate-400/30 py-4 rounded-lg'>
        <div className='flex items-center justify-between w-full px-4 text-purple-900'>
            <div className='flex items-center gap-3'>
                <FaUserFriends size={32}/>
                <h1 className='text-lg font-bold'>Friends</h1>
            </div>
            <div className='font-bold text-sm'>
                12/20
            </div>
        </div>
        <div className='flex justify-center w-full'>
            <SearchFriend />
        </div>
    </div>
  )
}

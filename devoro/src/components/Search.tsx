import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div>
      <div className='flex justify-center items-center gap-3'>
        <input type='text' className='relative py-2 px-4 rounded-md w-full' placeholder='Search'/>
        <FaSearch size={20} className='absolute right-5 cursor-pointer'/>
      </div>
    </div>
  )
}

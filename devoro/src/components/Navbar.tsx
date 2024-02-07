import { IoNotificationsOutline } from "react-icons/io5";
import useFirestore from "../../hooks/useFirestore";


export default function Navbar() {

  const { user } = useFirestore()
  
    return (
      <div className='bg-white flex fixed xl:w-[700px] lg:w-[599px] md:w-[639px] w-[400px] py-6 px-5 border-b border-slate-400/25 z-50'>
          <div className='flex items-center justify-between w-full mr-1.5'>
              <IoNotificationsOutline size={32} className='text-purple-900'/>
              <span className='font-semibold text-lg text-slate-600/90'>Hi, Dev {user?.email}!</span>
          </div>
      </div>
    )
  }

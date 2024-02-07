import { Link } from 'react-router-dom'
import useModalStore from '../store/modalStore'
import { signOut } from 'firebase/auth'

export default function LogoutModal() {
const [isLogoutModalOpen, setLogoutClose] = useModalStore((state) => [state.isLogoutModalOpen, state.setLogoutClose])



  return (
    <>
    {isLogoutModalOpen ? <div>
        <div className='w-[400px] h-40 rounded-xl border border-black/10 py-8 bg-white shadow-2xl z-50'>
            <div className='flex flex-col justify-center gap-8 items-center font-semibold'>
                <h2>Are you sure you want to logout?</h2>
                <div className='flex items-center gap-7'>
                    <button className='bg-red-500 hover:bg-red-800 text-white py-1.5 px-5 rounded-lg' onClick={setLogoutClose}>Cancel</button>
                    <Link to='/login'><button className='text-purple-500 font-bold' onClick={() => {setLogoutClose(); signOut}}>Logout</button></Link>
                </div>
            </div>
        </div>
    </div> : ''}
    </>
  )
}


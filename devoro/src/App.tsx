import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RightSidebar from './components/RightSidebar';
import LogoutModal from './components/LogoutModal';
import Bookmarks from './pages/Bookmarks';
import Messages from './pages/Messages';
import useFirestore from './firebase/useFirestore';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const { user } = useFirestore();

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
      </Routes>
    <main className='md:w-[800px] lg:w-[1000px] xl:w-[700px] mx-auto lg:mr-auto'>
    <div className='absolute left-0 w-[97%] h-[700px] bg-gradient-to-br lg:mt-0 mt-10  from-slate-100  to-slate-400 rounded-2xl filter blur-3xl opacity-50' />
            <div className="flex">
              <div>
                <LeftSidebar />
              </div>
              <div className="flex flex-col md:w-[80%] sm:w-full lg:w-full w-full h-auto">
                <Navbar />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path={`/profile/${user?.uid}`} element={<Profile />} />
                    <Route path='/bookmarks' element={<Bookmarks />} />
                    <Route path='/messages' element={<Messages />} />
                  </Routes>
              </div> 
              <div className="hidden lg:block">
                <RightSidebar />
              </div>
            </div>
            <div className="z-50 absolute top-[450px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <LogoutModal />  
            </div>
      </main>
    </BrowserRouter>
  )
}

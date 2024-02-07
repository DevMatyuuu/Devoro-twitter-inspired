import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RightSidebar from './components/RightSidebar';
import LogoutModal from './components/LogoutModal';
import Bookmarks from './pages/Bookmarks';
import Messages from './pages/Messages';
import useFirestore from '../hooks/useFirestore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DeleteModal from './components/deleteModal';

export default function App() {
  const { user } = useFirestore();

  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
      <main className='md:w-[800px] lg:w-[1000px] xl:w-[700px] mx-auto lg:mr-auto'>
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
        <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LogoutModal />  
        </div>
        <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <DeleteModal />  
        </div>
      </main>
    </BrowserRouter>
    </>
  )
}

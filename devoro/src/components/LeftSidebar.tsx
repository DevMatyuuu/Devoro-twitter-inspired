import { useEffect, useState } from 'react'
import logo from '../assets/Devoro-logo.png'
import logoMobile from '../assets/Devoro-logo-mobile.png'
import { GoHome } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { GoHomeFill } from "react-icons/go";
import { IoMail } from "react-icons/io5";
import { IoBookmarks } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";
import { TbLogout2 } from "react-icons/tb";
import useModalStore from '../store/modalStore'
import { Tooltip } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import useFirestore from '../firebase/useFirestore';


export default function LeftSidebar() {
  const { user } = useFirestore();

  const setOpen = useModalStore((state) => state.setOpen);

  const storedActive = JSON.parse(localStorage.getItem('active') as string);

  const [activeLink, setActiveLink] = useState<string>(storedActive)

  const handleLinkClick = (label: string) => {
    setActiveLink(label);
  };

  useEffect(() => {
    localStorage.setItem('active', JSON.stringify(activeLink));
  })

  if (activeLink === null) {
    setActiveLink('Home')
  } 

  const sideLinks = [
    {
      id: 1,
      label: 'Home',
      icon: <GoHome size={32}/>,
      iconActive: <GoHomeFill size={32}/>,
      route: '/'
    },
    {
      id: 2,
      label: 'Messages',
      icon:<IoMailOutline size={32}/>,
      iconActive: <IoMail size={32}/>,
      route: '/messages'
    },
    {
      id: 3,
      label: 'Bookmarks',
      icon:<IoBookmarksOutline size={32}/>,
      iconActive: <IoBookmarks size={32}/>,
      route: '/bookmarks',
    },
    {
      id: 4,
      label: 'Profile',
      icon:<HiOutlineUser size={32}/>,
      iconActive: <HiUser size={32}/>,
      route: `/profile/${user?.uid}`,
  
    },
  ]

    return (
      <div>
        <div className='bg-gray-1 -ml-[270px] flex fixed flex-col items-center gap-3 w-[100px] xl:w-[270px] lg:w-[200px] md:w-[145px] sm:w-[200px] h-screen border-r border-slate-500/20'>
          <div className='flex justify-center py-4 w-full'>
            <img src={logoMobile} alt='devoro-logo' className='md:hidden h-20 lg:w-32 lg:h-24 sm:h-20 sm:w-28' />
            <img src={logo} alt='devoro-logo' className='hidden lg:block h-20  lg:w-40 lg:h-14 sm:h-20 sm:w-28' />
          </div>
          <div className='flex flex-col gap-10 h-full'>
            {sideLinks.map((links) => (
              <Link to={links.route} onClick={() => handleLinkClick(links.label)} key={links.id} className={`${activeLink === links.label ? 'bg-slate-400/30' : 'hover:bg-gray-500/10'} flex items-center gap-3 px-10 py-4 rounded-lg cursor-pointer`}>
                <div className='text-purple-800'>{activeLink === links.label ? links.iconActive : links.icon}</div>
                <span className='text-purple-800 text-start font-bold text-xl'>{links.label}</span>
              </Link>
            ))}
            <div className='absolute bottom-10 right-8'>
              <Tooltip content="Log out" className='bg-slate-800 text-white'>
                  <TbLogout2 size={28} className='text-purple-900 cursor-pointer' onClick={setOpen}/>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    )
  }

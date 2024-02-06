import FriendsList from './FriendsList'
import Search from './Search'


export default function RightSidebar() {


    return (
      <div>
        <div className='hidden xl:flex fixed xl:w-[300px] lg:w-[200px] h-screen border-l border-slate-500/20 pl-4'>
          <div className='flex flex-col py-6 w-full gap-7'>
            <Search />
            <FriendsList />
          </div>
        </div>
      </div>
    )
  }


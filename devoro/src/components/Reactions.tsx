import useReactionStore from "@/store/reactionStore";
import { BiRepost } from "react-icons/bi";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";

interface post {
  username?: string,
  uid?: string,
  id?: string,
  text?: string,
  timestamp?: string,
  image?: string,
  photoURL?: string,
}

export default function Reactions(posts : post) {
    const [isComment, isHeart, isRepost, commentCount, heartCount, repostCount, setIsComment, setIsHeart, setIsRepost, setCommentCount, setHeartCount, setRepostCount ] = useReactionStore((state) => [state.isComment, state.isHeart, state.isRepost, state.commentCount, state.heartCount, state.repostCount, state.setIsComment, state.setIsHeart, state.setIsRepost, state.setCommentCount, state.setHeartCount, state.setRepostCount ])

    const handleCommentClick = () => {
    }
        

    const handleHeartClick = () => {
        setIsHeart(true);
        if(!isHeart) { 
            setHeartCount(heartCount + 1) 
        }else {
            setHeartCount(heartCount - 1)
            setIsHeart(false)
        } 
    }
        

    const handleRepostIncrement = () => {
        
    }
    const handleRepostDecrement = () => {
        
    }

  return (
    <div className='flex items-center justify-center gap-12  mt-2'>
        <div   className='flex items-center gap-1 hover:text-green-800 px-3 py-2.5 hover:bg-green-200/60 rounded-full cursor-pointer'>
            <FaRegComment className='size-4'/>
            <span className='text-sm'>{commentCount}</span>
        </div>
        <div onClick={handleHeartClick} className='flex items-center gap-1 hover:text-red-800 px-2 py-2 hover:bg-red-300/70 rounded-full cursor-pointer'>
            {!isHeart ? <FaRegHeart className='size-4'/> : <FaHeart className='size-4 text-red-500'/>}
            <span className='text-sm'>{heartCount}</span>
        </div>
        <div className='flex items-center gap-1 hover:text-purple-800 px-2 py-2 hover:bg-violet-200/60 rounded-full cursor-pointer'>
            <BiRepost className='size-6'/>
            <span className='text-sm'>{repostCount}</span>
        </div>  
    </div>
  )
}

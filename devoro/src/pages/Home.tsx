import Post from '../components/Post'
import Feed from '../components/Feed'

export default function Home() {
  return (
    <div className='flex flex-col gap-3 justify-center items-center w-[95%] mx-auto'>
      <Post />
      <hr className='h-0.3 bg-black/15 w-full'></hr>
      <Feed />
    </div>
)
}

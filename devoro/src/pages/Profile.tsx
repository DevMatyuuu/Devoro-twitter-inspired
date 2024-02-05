import useFirestore from '../firebase/useFirestore'

export default function Profile() {
  const { allPost, user } = useFirestore()

  const specificPost = allPost.filter(posts => posts.uid === user?.uid)

    return (
      <div className='flex flex-col gap-3 w-[95%] mx-auto mt-24 z-40'>
        <h1 className='text-4xl font-bold'>Profile</h1>
        <div className='flex flex-col gap-8
        3 border border-black/10 rounded-lg px-5 py-10'>
          <div className='flex justify-center'>
            <img src={''} alt='user-image' className='h-44 w-44 rounded-full shadow-2xl'/>
          </div>
          <div className='flex flex-col justify-start gap-y-6 w-full'>
            <div className='flex flex-col gap-2 mx-auto w-[60%]'>
              <span>Name:</span>
              <input type='text' className='py-3 px-4 rounded-lg w-full border border-black/10 bg-black/10' placeholder='Username'/>
            </div>
            <div className='flex flex-col gap-2 mx-auto w-[60%]'>
              <span>Email:</span>
              <span className='py-4 px-4 rounded-lg w-full border border-black/10 bg-black/15 cursor-default'>
                {user?.email}
              </span>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          {specificPost.map((post) => (
            <div key={post.id}>
              {post.text}
            </div>
          ))}
        </div>
      </div>
    )
}

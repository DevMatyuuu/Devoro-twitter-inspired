import useFirestore from '../firebase/useFirestore'


export default function Feed() {
  const { allPost } = useFirestore()
  const reversedPosts = allPost.reverse()
 
    return (
      <div className='z-40'>
        {reversedPosts.map((posts) => (
          <div key={posts.id}>
            <span>{posts.text}</span>
          </div>
        ))}
      </div>
    )
  } 

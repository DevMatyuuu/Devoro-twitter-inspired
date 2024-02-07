import useModalStore from '@/store/modalStore';
import  { db }  from '../firebase/firebase';
import { deleteDoc, query, collection, where, getDocs } from "firebase/firestore"; 
import useFirestore from '../../hooks/useFirestore';

interface deleteProp {
    postId?: string
}


export default function DeleteModal({postId}: deleteProp) {
    const [isDeleteModalOpen, setDeleteClose] = useModalStore((state) => [state.isDeleteModalOpen, state.setDeleteClose])
    const { allPost } = useFirestore();

    const id = allPost.find(post => post.id === postId)

    const deletePost = async (id: string) => {
        const q = query(collection(db, "posts"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      };

    return (
      <>
      {isDeleteModalOpen ? <div>
          <div className='w-[400px] h-40 rounded-xl border border-black/10 py-8 bg-white shadow-2xl z-50'>
              <div className='flex flex-col justify-center gap-8 items-center font-semibold'>
                  <h2>Are you sure you want to Delete this post?</h2>
                  <div className='flex items-center gap-7'>
                      <button className='bg-red-500 hover:bg-red-800 text-white py-1.5 px-5 rounded-lg' onClick={setDeleteClose}>Cancel</button>
                      <button className='text-purple-500 font-bold' onClick={() => {setDeleteClose(); deletePost(id?.id as string)}}>Delete</button>
                  </div>
              </div>
          </div>
      </div> : ''}
      </>
    )
  }

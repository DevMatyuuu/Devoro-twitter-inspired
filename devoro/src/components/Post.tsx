import React, {useRef} from 'react'
import { FaImage } from "react-icons/fa";
import { IoLocationSharp, IoClose } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Tooltip } from '@material-tailwind/react';
import usePostStore from '../store/postStore';
import Lottie from 'lottie-react'
import loader from '../assets/loading.json'
import { db, storage } from '../firebase/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString, } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import useFirestore from '../../hooks/useFirestore';



export default function Post() {
  const { input, setInput, media, setMedia, emoji, setEmoji, loading, setLoading} = usePostStore();

  const { user } = useFirestore()


  const filePickerRef = useRef<any>();

  const addEmojiToTextAreaField = (e: any) => {
    let sym = e.unified.split("-");
    let codesArray: number[] = [];
    sym.forEach((el: string) => codesArray.push(parseInt("0x" + el)));
    let emojis = String.fromCodePoint(...codesArray);
    setInput(input + emojis)
  }

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent: any) => {
      setMedia(readerEvent.target.result);
    }
  }

  const sendPost = async () => {
    if (loading) return;

          setLoading(true);

          const docRef = await addDoc(collection(db, 'posts'), {
            username: user?.email,
            uid: user?.uid,
            id: uuidv4(), 
            text: input,
            timestamp: serverTimestamp(),
          });

          const imageRef = ref(storage, `posts/${docRef.id}/image`);

          if (media) {
            await uploadString(imageRef, media, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, 'posts', docRef.id), {
              image: downloadURL,
            });
          }

          setLoading(false);
          setInput('');
          setMedia(null);
          setEmoji(false);
        }
  
  return (
    <div className='w-[95%] z-40'>
        <div className='flex flex-col gap-3 justify-center h-auto mt-24 border border-black/20 rounded-xl'>
            <div className='flex flex-col px-7'>
             <textarea rows={Number('2')} cols={Number('70')} value={input} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)} className='mt-5 h-20 w-full resize-none rounded-xl bg-transparent py-3 focus: outline-none' contentEditable placeholder='Share your thoughts...'></textarea>
             {media && (
                  <div className='relative'>
                  <div onClick={() => setMedia(null)} className='absolute w-8 h-8  bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-[280px] cursor pointer'>
                    <IoClose className='text-white h-5 cursor-pointer'/>
                  </div>
                  <img src={media} alt='' className='rounded-xl max-h-80 object-contain w-80 z-0'/>
                </div>
                )}
            </div>
             <div className='px-7 mb-3 flex justify-between items-center z-50'>
              <div className='flex items-center gap-4'>
                <Tooltip content='Media' className='px-3 z-50'>
                        <div onClick={() => filePickerRef.current.click()}>
                            <FaImage size={24} className='text-black/50 hover:text-purple-900 cursor-pointer'/>
                            <input ref={filePickerRef} onChange={addImageToPost} type='file' id='file' hidden />
                        </div>
                </Tooltip>
                 <Tooltip content='Location' className='z-50'>
                        <div>
                          <IoLocationSharp size={24} className='text-black/50 hover:text-purple-900 cursor-pointer'/>
                        </div>
                  </Tooltip>
                 <Tooltip content='Emoji' className='z-50'>
                        <div onClick={() => setEmoji(!emoji)}>
                          <MdEmojiEmotions size={24} className='text-black/50 hover:text-purple-900 cursor-pointer'/>
                        </div>
                </Tooltip>
                <Tooltip content='Calendar' className='z-50'>
                        <FaCalendarAlt size={20} className='text-black/50 hover:text-purple-900 cursor-pointer'/>
                </Tooltip>
                </div>
                <div className='absolute mt-[480px] z-50'>
                  {emoji && (
                    <Picker 
                      data={data}
                      onEmojiSelect={addEmojiToTextAreaField}
                      theme='dark'
                      />
                  )}
                </div>
                <div className='flex items-center gap-5'>
                {loading ? (
                  <Lottie animationData={loader} className='h-10 w-10' />
                  ) : (
                  ''
                  )}
                  <button onClick={() => sendPost()} className={`${!input.trim() && !media ? '' : 'hover:bg-purple-500' } rounded-md py-2 px-12 bg-purple-900 text-white disabled:opacity-50 disabled:cursor-auto`} disabled={!input.trim() && !media}>Post</button>
                </div>
             </div>
        </div>
    </div>
  )
}

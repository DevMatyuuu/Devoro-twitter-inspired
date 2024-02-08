import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { feedPosts } from "../src/firebase/controller";
import { auth } from "../src/firebase/firebase";

interface post {
  username?: string,
  uid?: string,
  id?: string,
  text?: string,
  timestamp?: string,
  image?: string,
  photoURL?: string,
}

interface user {
  uid?: string,
  username?: string,
  email?: string | null,
  photoURL: string | null,
  password?: string
  profilePic?: string | null,
}

export default function useFirestore() {
    const [allPost, setAllPost] = useState<post[]>([]);
    const [user, setUser] = useState<user | null>(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const { email, photoURL, uid} = user;
          setUser({ email, photoURL, uid});
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }, []);


    useEffect(
      () => {
      const unsubscribe = onSnapshot(feedPosts, (snapshot: QuerySnapshot<DocumentData>) => {
       setAllPost( 
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
          
        })
       );
    });
    return () => unsubscribe();
  },
      []
    );
  
  
    

    return { user, setUser, allPost };
  
}






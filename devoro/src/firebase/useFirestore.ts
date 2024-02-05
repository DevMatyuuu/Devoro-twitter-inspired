import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { postsCollection} from "./controller";
import { auth } from "./firebase";

interface post {
  uid?: string,
  id?: string,
  text?: string,
  timestamp?: string,
}

interface user {
  uid?: string,
  username?: string,
  email: string | null,
  photoURL: string | null,
  password?: string
}

export default function useFirestore() {
    const [allPost, setAllPost] = useState<post[]>([]);
    const [user, setUser] = useState<user | null>(null);

    


    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          const { email, photoURL, uid } = user;
          setUser({ email, photoURL, uid });
        } else {
          // No user is signed in.
          setUser(null);
        }
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);


    useEffect(
      () => {
      const unsubscribe = onSnapshot(postsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
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
  
  
    

    return { user, allPost };
  
}





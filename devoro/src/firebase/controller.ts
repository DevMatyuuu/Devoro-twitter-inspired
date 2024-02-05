import { db } from "./firebase";
import { collection} from 'firebase/firestore'


export const usersCollection = collection(db, "users");

export const postsCollection = collection(db, 'posts');

//query

import { db } from "./firebase";
import { collection, orderBy, query} from 'firebase/firestore'


export const postsCollection = collection(db, 'posts');

//query
export const feedPosts = query(postsCollection, orderBy('timestamp'));

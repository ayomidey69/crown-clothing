import { initializeApp} from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider} from 'firebase/auth';

    import {
    getFirestore,
    doc,
    getDoc,
    setDoc
    } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyArlczLf1Nhw0cNyQJGQLeoYnB8mmbKqGQ",
    authDomain: "crwn-clothing-db-d273b.firebaseapp.com",
    projectId: "crwn-clothing-db-d273b",
    storageBucket: "crwn-clothing-db-d273b.appspot.com",
    messagingSenderId: "49387084031",
    appId: "1:49387084031:web:94a46c7badf0ecc5f954ca",
    measurementId: "G-6MJ32BJXX1"
  };
  
  
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
   prompt: "select_account"
  });
  export const auth = getAuth();
  export const signInWithGooglePopup = ()=>signInWithPopup(auth,provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth) =>{
    const userDocRef = doc(db,'users',userAuth.uid);
    
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

     console.log(userSnapshot);
     console.log(userSnapshot.exists());A


     if(!userSnapshot.exists()){
        const{displayName, email} = userAuth
        const createdAt=new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });

        } catch(error)  {
            console.log('error creating the user',error.message);
        }
     }
     return userDocRef;
  };













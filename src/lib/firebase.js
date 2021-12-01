import Firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth'

//import { seedDatabase} from '../seed'
//here call the seed file only once

const confing = { 
        apiKey: "AIzaSyDpIJdYYiSMyWZ4R4kvEnBh-Tb1Lot_5fc",
        authDomain: "instagram-2e2d3.firebaseapp.com",
        projectId: "instagram-2e2d3",
        storageBucket: "instagram-2e2d3.appspot.com",
        messagingSenderId: "209964525297",
        appId: "1:209964525297:web:91c66635a83aae39256b50"   
};

const firebase = Firebase.initializeApp(confing);
const  { FieldValue } = Firebase.firestore;

//seedDatabase(firebase)
export { firebase, FieldValue };



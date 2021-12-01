import {firebase} from '../lib/firebase';

export default async function doesUsernameExist(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

    return result.docs.map((user) => user.data().lenght > 0);
}
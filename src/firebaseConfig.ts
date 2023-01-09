import { initializeApp } from 'firebase/app'
import { getAuth, User, updateProfile } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

const storage = getStorage()

export async function upload(
  file: File | undefined,
  currentUser: User | undefined,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setIsLoading(true)
  if (currentUser && file) {
    const fileRef = ref(storage, `files/${currentUser.uid}/${file.name}`)
    await uploadBytes(fileRef, file)
    const photoUrl = await getDownloadURL(fileRef)
    await updateProfile(currentUser, { photoURL: photoUrl })
  }
  setIsLoading(false)
}

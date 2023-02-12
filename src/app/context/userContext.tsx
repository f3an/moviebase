import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
  sendEmailVerification,
  updateEmail,
  updateProfile,
  updatePassword,
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userContext = createContext<any>({})

type UserCredential = {
  email: string
  password: string
}

export const useUserContext = () => {
  return useContext(userContext)
}

const storage = getStorage()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>()

  const signUp = async ({ email, password }: UserCredential) => {
    await createUserWithEmailAndPassword(auth, email, password)
    if (user) {
      return sendEmailVerification(user)
    }
  }
  const signIn = ({ email, password }: UserCredential) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    return signOut(auth)
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const deleteUser = () => {
    if (user) {
      user.delete()
    }
  }

  const changeEmail = async (newEmail: string) => {
    if (user) {
      return updateEmail(user, newEmail)
    }
  }

  const changeUsername = async (username: string) => {
    if (user) {
      return updateProfile(user, { displayName: username })
    }
  }

  const changePassword = (newPassword: string) => {
    if (user) {
      return updatePassword(user, newPassword)
    }
  }

  const sendVerify = () => {
    if (user && user.emailVerified === false) {
      return sendEmailVerification(user)
    }
  }

  const uploadUserPhoto = async (
    file: File | undefined,
    currentUser: User | undefined,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setIsLoading(true)
    if (user && file) {
      const fileRef = ref(storage, `files/${user.uid}/${file.name}`)
      await uploadBytes(fileRef, file)
      const photoUrl = await getDownloadURL(fileRef)
      await updateProfile(user, { photoURL: photoUrl })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null): void => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(undefined)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <userContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signInWithGoogle,
        logOut,
        deleteUser,
        changeEmail,
        uploadUserPhoto,
        changeUsername,
        sendVerify,
        changePassword
      }}
    >
      {children}
    </userContext.Provider>
  )
}

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
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userContext = createContext<any>({})

type UserCredential = {
  email: string
  password: string
}

export const useUserContext = () => {
  return useContext(userContext)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>()

  const signUp = async ({ email, password }: UserCredential) => {
    await createUserWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) {
      return sendEmailVerification(auth.currentUser)
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
    <userContext.Provider value={{ user, signIn, signUp, signInWithGoogle, logOut }}>
      {children}
    </userContext.Provider>
  )
}

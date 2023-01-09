import { getDatabase, ref, set } from 'firebase/database'

export const writeUserData = async (userId: number) => {
  const db = getDatabase()
  const reference = ref(db, 'users/' + userId)

  set(reference, { email: `${userId}@gmail.com` })
}
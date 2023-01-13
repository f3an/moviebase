import { getDatabase, ref, set } from 'firebase/database'

export const writeUserData = async (userId: number) => {
  const db = getDatabase()
  const reference = ref(db, 'users/' + userId)

  set(reference, { email: `${userId}@gmail.com` })
}
export const writeComment = async ({ userId, filmId, comment }: Inputs) => {
  const db = getDatabase()
  const reference = ref(db, 'Comments/' + filmId)

  set(reference, { userId: userId, comment: comment })
}

type Inputs = {
  userId: string
  filmId: string
  comment: string
}

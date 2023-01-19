import { getDatabase, push, ref, set } from 'firebase/database'

const db = getDatabase()

export const writeUserData = (userId: number) => {
  const reference = ref(db, 'users/' + userId)

  set(reference, { email: `${userId}@gmail.com` })
}
export const writeComment = ({ id, Comment }: Inputs) => {
  const reference = ref(db, `films/${id}/comments/`)

  push(reference, {
    userId: Comment.userId,
    photoURL: Comment.photoURL,
    comment: Comment.comment,
    email: Comment.email,
  })
}

type Inputs = {
  id: number
  Comment: Comment
}

type Comment = {
  userId: string
  comment: string
  email: string
  photoURL: string
}

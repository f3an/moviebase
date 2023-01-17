import { getDatabase, onValue, push, ref, set } from 'firebase/database'

const db = getDatabase()

export const writeUserData = (userId: number) => {
  const reference = ref(db, 'users/' + userId)

  set(reference, { email: `${userId}@gmail.com` })
}
export const writeComment = ({ id, Comment }: Inputs) => {
  const reference = ref(db, `films/${id}/comments/`)

  push(reference, { userId: Comment.userId, comment: Comment.comment, email: Comment.email })
}

export const getComments = ({ id }: { id: number }) => {
  const reference = ref(db, `/films/${id}/comments`)
  let comments: Comment[] = []

  onValue(reference, (snapshot) => {
    const data: Comment[] = Object.values(snapshot.val())
    if (data !== null) {
      comments = data
    }
  })

  return comments
}

type Inputs = {
  id: number
  Comment: Comment
}

type Comment = {
  userId: string
  comment: string
  email: string
}

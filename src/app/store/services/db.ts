import { getDatabase, onValue, push, ref, set } from 'firebase/database'

const db = getDatabase()

export const writeUserData = (userId: number) => {
  const reference = ref(db, 'users/' + userId)

  set(reference, { email: `${userId}@gmail.com` })
}
export const writeComment = ({ userId, id, comment, email }: Inputs) => {
  const reference = ref(db, `films/${id}/comments/`)

  push(reference, { userId: userId, comment: comment, email: email })
}

export const getDbValues = ({ id }: { id: number }) => {
  const reference = ref(db, `/films/${id}/comments`)
  let comments: any = null

  onValue(reference, (snapshot) => {
    const data = Object.values(snapshot.val())
    if (data !== null) {
      comments = data
    }
  })

  return comments
}

type Inputs = {
  userId: string
  id: number
  comment: string
  email: string
}

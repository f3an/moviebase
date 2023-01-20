import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { selectMovieIdValue } from '../store/storeSlices/movieReducerSlice'
import { useAppSelector } from './storeHooks'

export const useGetComments = () => {
  const movieId = useAppSelector(selectMovieIdValue)
  const db = getDatabase()
  const reference = ref(db, `/films/${movieId}/comments`)
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    onValue(reference, (snapshot) => {
      if (snapshot.val() !== null) {
        const data: Comment[] = Object.values(snapshot.val())
        setComments(data)
      } else {
        setComments([])
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId])

  return comments
}

type Comment = {
  userId: string
  comment: string
  email: string
  photoURL: string
}

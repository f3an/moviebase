import { Container } from '@mui/system'
import React from 'react'
import './main.css'
import { useFilmsList } from '../../hooks/use-film-list'
import Card from '../card/card'

function Main(props:any): JSX.Element {
  let page = 1

  const [films,isLoading, Error] = useFilmsList(page,props.isFirstTimeOpen);
  if(Error) {
    console.log(Error);
  }

  return (
    <Container className="moviebase-app" style={{display: "flex",flexWrap: "wrap"}}>
      {isLoading === true 
      ?""
      :films.map((data:any, key=0) => {
        return (
          <Card filmData={data} key={key}/> 
        );
      })}
    </Container>
  )
}

export default Main

import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/header'
import Registeration from './components/authorization/authorization'
import Main from './components/main/main'
import Account from './components/account/account'
import Forgot from './components/forgot/forgot'
import MoviebaseAnimatedLogo from './components/animated-logo/animated-logo'
import Film from './components/film/film'

function App(): JSX.Element {

  const [isFirstTimeOpen, setIsFirstTimeOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFirstTimeOpen(false);
    }, 2500)
  }, [isFirstTimeOpen])

  return (
    <div className='App'>
      <BrowserRouter>
        {isFirstTimeOpen ?
          <div className="moviebase-greeting-block">
            <MoviebaseAnimatedLogo />
          </div>
          : ""}
        <Header></Header>

        <Routes>
          <Route path='/' element={<Main isFirstTimeOpen={isFirstTimeOpen} />} />
          <Route path='/:movie' element={<Film/>}/>
          <Route path='/account' element={<Account />} />
          <Route path='/account/authorization' element={<Registeration />} />
          <Route path='/account/authorization/forgot' element={<Forgot />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

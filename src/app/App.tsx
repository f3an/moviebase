import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Registeration from './components/authorization/Authorization'
import Main from './components/main/Main'
import Account from './components/account/Account'
import Forgot from './components/forgot/Forgot'
import { MoviebaseAnimatedLogo } from './components/animated-logo/AnimatedLogo'
import Film from './components/film/Film'

function App (): JSX.Element {
  const [isFirstTimeOpen, setIsFirstTimeOpen] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setIsFirstTimeOpen(false)
    }, 2500)
    return () => clearTimeout(t)
  }, [isFirstTimeOpen])

  return (
    <div className='App'>
      <BrowserRouter>
        {isFirstTimeOpen
          ? (
              <div className="moviebase-greeting-block">
              <MoviebaseAnimatedLogo />
              </div>
            )
          : ''}
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

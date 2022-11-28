import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { MainPage } from './components/mainPage/mainPage'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { MoviebaseAnimatedLogo } from './components/animated-logo/AnimatedLogo'
import { MoviePage } from './components/moviePage/moviePage'
import { TrendingMoviesPage } from './components/trendingMoviesPage/trendingMoviesPage'
import { MoviesByGenrePage } from './components/moviesByGenrePage/moviesByGenrePage'
import { AuthorizationPage } from './components/authorizationPage/AuthorizationPage'
import { AccountPage } from './components/accountPage/accountPage'
import { SearchPage } from './components/searchPage/searchPage'
import { ForgotPasswordPage } from './components/forgotPasswordPage/forgotPasswordPage'

function App() {
  const [isFirstTimeOpen, setIsFirstTimeOpen] = useState(true)

  setTimeout(() => {
    setIsFirstTimeOpen(false)
  }, 2300)

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isFirstTimeOpen ? <MoviebaseAnimatedLogo /> : ''}
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/trending/:page' element={<TrendingMoviesPage />} />
          <Route path='/genre/:genreId/:page' element={<MoviesByGenrePage />} />
          <Route path='/movie/:movieId' element={<MoviePage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/authorization' element={<AuthorizationPage />} />
          <Route path='/authorization/forgot' element={<ForgotPasswordPage />} />
          <Route path='/search/:searchRequest/:page' element={<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App

import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ArticleComponent from '../component/ArticleComponent'
import HeroSection from '../component/HeroSection'
import About from '../component/About'

const AppLayout = () => {
  return (
    <>
    <div>
        <Header/>
        <HeroSection />
        <About />
        {/* <ArticleComponent /> */}
        <Outlet/>
        {/* <Footer/> */}

    </div>
    </>
  )
}

export default AppLayout
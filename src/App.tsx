import { type ReactNode } from 'react'
import './App.css'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import { LoadingBar } from './components/shared/LoadingBar'

function App({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingBar />
      <NavBar />
      {children}
      <Footer />
    </>
  )
}

export default App

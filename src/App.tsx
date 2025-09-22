import { type ReactNode } from 'react'
import './App.css'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

function App({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import Landing from './Landing.jsx'
import Admin from './Admin.jsx'

// #admin → бүртгэлүүдийг харах самбар, бусад үед бүртгэлийн хуудас
export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash === '#admin' ? <Admin /> : <Landing />
}

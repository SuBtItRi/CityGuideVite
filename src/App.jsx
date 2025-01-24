import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { Header, Footer, Loader, SubscribeModal } from './components'
import { NotFound, Home, Catalog, Contacts, Landmark, Reglog, AccountSettings } from './pages'

import { simpleHash } from './simpleHash'
import { fetchUserData } from './api'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/actions'

import './scss/app.scss'

const queryClient = new QueryClient()

function AuthCheck() {
  const dispatch = useDispatch()

  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const { data: usernameData, isLoading: usernameLoading } = useQuery(
    ['username', username],
    () => fetchUserData(username),
    { enabled: !!username }
  )

  useEffect(() => {
    dispatch(setUser(null))
    const checkUser = async () => {
      if (usernameData) {
        if (usernameData[0].username == username) {
          if (usernameData[0].password === (await simpleHash(password))) {
            dispatch(setUser(usernameData[0]))
          }
        }
      }
    }

    checkUser()
  }, [usernameData, dispatch])

  if (usernameLoading) {
    return <Loader />
  }

  return null
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCheck />
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/landmark/:id" element={<Landmark />} />
          <Route path="/login" element={<Reglog />} />
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <SubscribeModal />
      <Footer />
    </QueryClientProvider>
  )
}

export default App

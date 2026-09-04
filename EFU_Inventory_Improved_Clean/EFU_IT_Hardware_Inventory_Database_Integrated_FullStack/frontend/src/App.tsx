import { useEffect, useState } from 'react'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import MasterSetup from './components/MasterSetup'
import NewAsset from './components/NewAsset'
import { AssetAllocation, AssetRevocation, AssetExpiration, RecentAllocations } from './components/Transactions'
import Reports from './components/Reports'
import Settings from './components/Settings'
import Profile from './components/Profile'
import Notifications from './components/Notifications'
import Assets from './components/Assets'
import { authApi, clearSession, loadSession, updateStoredUser } from './api'

type Screen =
  | 'dashboard'
  | 'assets'
  | 'asset-type' | 'asset-make' | 'motherboard' | 'memory' | 'storage'
  | 'operating-system' | 'vendor' | 'province' | 'city' | 'location'
  | 'department' | 'office' | 'employee' | 'lifecycle-policy'
  | 'new-asset' | 'asset-allocation' | 'asset-revocation' | 'asset-expiration'
  | 'asset-history' | 'recent-allocations' | 'settings' | 'profile' | 'notifications' | 'asset-details'

const masterSetupScreens: Screen[] = [
  'asset-type', 'asset-make', 'motherboard', 'memory', 'storage',
  'operating-system', 'vendor', 'province', 'city', 'location',
  'department', 'office', 'employee', 'lifecycle-policy',
]

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(loadSession(false)))
  const [checkingSession, setCheckingSession] = useState(loggedIn)
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard')

  useEffect(() => {
    const unauthorized = () => {
      clearSession()
      setLoggedIn(false)
      setCurrentScreen('dashboard')
    }
    window.addEventListener('efu:unauthorized', unauthorized)
    return () => window.removeEventListener('efu:unauthorized', unauthorized)
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      setCheckingSession(false)
      return
    }
    setCheckingSession(true)
    authApi.me()
      .then(updateStoredUser)
      .catch(() => {
        clearSession()
        setLoggedIn(false)
      })
      .finally(() => setCheckingSession(false))
  }, [loggedIn])

  if (checkingSession) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#005BAC', fontFamily: 'Inter, sans-serif' }}>Loading your workspace…</div>
  }

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  const navigate = (screen: string) => setCurrentScreen(screen as Screen)

  const renderScreen = () => {
    if (currentScreen === 'dashboard') return <Dashboard onNavigate={navigate} />
    if (currentScreen === 'assets') return <Assets onNavigate={navigate} />
    if (masterSetupScreens.includes(currentScreen)) return <MasterSetup screenKey={currentScreen} />
    if (currentScreen === 'new-asset') return <NewAsset onCancel={() => setCurrentScreen('dashboard')} />
    if (currentScreen === 'asset-allocation') return <AssetAllocation />
    if (currentScreen === 'asset-revocation') return <AssetRevocation />
    if (currentScreen === 'asset-expiration') return <AssetExpiration />
    if (currentScreen === 'asset-history') return <Reports />
    if (currentScreen === 'recent-allocations') return <RecentAllocations />
    if (currentScreen === 'settings') return <Settings />
    if (currentScreen === 'profile') return <Profile />
    if (currentScreen === 'notifications') return <Notifications />
    return <Dashboard onNavigate={navigate} />
  }

  const logout = async () => {
    const session = loadSession(false)
    clearSession()
    setLoggedIn(false)
    setCurrentScreen('dashboard')
    if (session) await authApi.logout(session).catch(() => undefined)
  }

  return (
    <Layout currentScreen={currentScreen} onNavigate={navigate} onLogout={logout}>
      {renderScreen()}
    </Layout>
  )
}

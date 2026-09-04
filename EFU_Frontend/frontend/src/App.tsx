import { useEffect, useState } from "react"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import MasterSetup from "./components/MasterSetup"
import NewAsset from "./components/NewAsset"
import Reports from "./components/Reports"
import Settings from "./components/Settings"
import Profile from "./components/Profile"
import Notifications from "./components/Notifications"
import Assets from "./components/Assets"
import AllocationHistory from "./components/AllocationHistory"
import { AssetAllocation, AssetRevocation, AssetExpiration } from "./components/Transactions"
import { authApi, clearSession, loadSession, updateStoredUser } from "./api"
import { installInputLimits } from "./constants/inputLimits"

type Screen = "dashboard" | "assets" | "asset-type" | "asset-make" | "motherboard" | "memory" | "storage" | "operating-system" | "vendor" | "province" | "city" | "location" | "department" | "office" | "employee" | "lifecycle-policy" | "new-asset" | "allocations" | "asset-allocation" | "asset-revocation" | "asset-expiration" | "asset-history" | "settings" | "profile" | "notifications" | "asset-details"

const masterSetupScreens: Screen[] = [
  "asset-type",
  "asset-make",
  "motherboard",
  "memory",
  "storage",
  "operating-system",
  "vendor",
  "province",
  "city",
  "location",
  "department",
  "office",
  "employee",
  "lifecycle-policy",
]

const screenRoutes: Record<Screen, string> = {
  dashboard: "/dashboard",
  assets: "/assets",
  "new-asset": "/assets/new",
  allocations: "/allocations",
  "asset-allocation": "/allocations/new",
  "asset-revocation": "/allocations/return",
  "asset-expiration": "/assets/retire",
  "asset-history": "/reports/assets",
  settings: "/settings",
  profile: "/profile",
  notifications: "/notifications",
  "asset-details": "/assets",
  "asset-type": "/master/asset-types",
  "asset-make": "/master/asset-makes",
  motherboard: "/master/motherboards",
  memory: "/master/memory",
  storage: "/master/storage",
  "operating-system": "/master/operating-systems",
  vendor: "/master/vendors",
  province: "/master/provinces",
  city: "/master/cities",
  location: "/master/locations",
  department: "/master/departments",
  office: "/master/offices",
  employee: "/master/employees",
  "lifecycle-policy": "/master/lifecycle-policies",
}

const routeScreens = Object.fromEntries(
  Object.entries(screenRoutes).map(([screen, route]) => [route, screen]),
) as Record<string, Screen>
const screenFromLocation = (): Screen =>
  routeScreens[window.location.pathname.replace(/\/$/, "") || "/"] ||
  "dashboard"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(loadSession(false)))
  const [currentScreen, setCurrentScreen] = useState<Screen>(screenFromLocation)

  useEffect(() => installInputLimits(), [])

  useEffect(() => {
    const onPopState = () => setCurrentScreen(screenFromLocation())
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    const unauthorized = () => {
      clearSession()
      setLoggedIn(false)
      setCurrentScreen("dashboard")
    }
    window.addEventListener("efu:unauthorized", unauthorized)
    return () => window.removeEventListener("efu:unauthorized", unauthorized)
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      return
    }
    authApi
      .me()
      .then(updateStoredUser)
      .catch(() => {
        clearSession()
        setLoggedIn(false)
      })
  }, [loggedIn])

  const isViewer = loadSession(false)?.user.role === "VIEWER"

  useEffect(() => {
    if (!loggedIn || !isViewer || currentScreen === "dashboard") return
    window.history.replaceState({}, "", screenRoutes.dashboard)
    setCurrentScreen("dashboard")
  }, [currentScreen, isViewer, loggedIn])

  if (!loggedIn)
    return (
      <Login
        onLogin={() => {
          window.history.replaceState({}, "", screenRoutes.dashboard)
          setCurrentScreen("dashboard")
          setLoggedIn(true)
        }}
      />
    )

  const navigate = (screen: string) => {
    const requested = screen as Screen
    const next = isViewer ? "dashboard" : requested
    window.history.pushState(
      {},
      "",
      screenRoutes[next] || screenRoutes.dashboard,
    )
    setCurrentScreen(next)
  }

  const renderScreen = () => {
    if (isViewer) return <Dashboard onNavigate={navigate} />
    if (currentScreen === "dashboard")
      return <Dashboard onNavigate={navigate} />
    if (currentScreen === "assets") return <Assets />
    if (currentScreen === "allocations") return <AllocationHistory />
    if (masterSetupScreens.includes(currentScreen))
      return <MasterSetup screenKey={currentScreen} />
    if (currentScreen === "new-asset")
      return <NewAsset onCancel={() => setCurrentScreen("dashboard")} />
    if (currentScreen === "asset-allocation") return <AssetAllocation />
    if (currentScreen === "asset-revocation") return <AssetRevocation />
    if (currentScreen === "asset-expiration") return <AssetExpiration />
    if (currentScreen === "asset-history") return <Reports />
    if (currentScreen === "settings") return <Settings />
    if (currentScreen === "profile") return <Profile />
    if (currentScreen === "notifications") return <Notifications />
    return <Dashboard onNavigate={navigate} />
  }

  const logout = async () => {
    const session = loadSession(false)
    clearSession()
    setLoggedIn(false)
    setCurrentScreen("dashboard")
    if (session) await authApi.logout(session).catch(() => undefined)
  }

  return (
    <Layout
      currentScreen={currentScreen}
      onNavigate={navigate}
      onLogout={logout}
    >
      {renderScreen()}
    </Layout>
  )
}

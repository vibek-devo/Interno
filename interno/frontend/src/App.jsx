import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import './index.css'

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl">Interno</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/tasks" className="hover:text-blue-600">Tasks</Link>
            <Link to="/progress" className="hover:text-blue-600">Daily Progress</Link>
            <Link to="/documents" className="hover:text-blue-600">Documents</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-gray-500">© {new Date().getFullYear()} Interno</div>
      </footer>
    </div>
  )
}

function Login() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in to Interno</h1>
      <form className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Email" />
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2">Sign in</button>
      </form>
    </div>
  )
}

function Dashboard() { return <div className="grid gap-6 md:grid-cols-3">
  <div className="p-4 bg-white rounded shadow-sm">Tasks</div>
  <div className="p-4 bg-white rounded shadow-sm">Progress</div>
  <div className="p-4 bg-white rounded shadow-sm">Documents</div>
</div> }

function Tasks() { return <div className="p-4 bg-white rounded shadow-sm">Task list goes here</div> }
function Progress() { return <div className="p-4 bg-white rounded shadow-sm">Daily progress goes here</div> }
function Documents() { return <div className="p-4 bg-white rounded shadow-sm">Documents go here</div> }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Shell><Dashboard /></Shell>} />
        <Route path="/dashboard" element={<Shell><Dashboard /></Shell>} />
        <Route path="/tasks" element={<Shell><Tasks /></Shell>} />
        <Route path="/progress" element={<Shell><Progress /></Shell>} />
        <Route path="/documents" element={<Shell><Documents /></Shell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

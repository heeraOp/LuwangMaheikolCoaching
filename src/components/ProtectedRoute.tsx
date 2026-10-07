import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { PageLoading } from './PageState'

export default function ProtectedRoute() {
  const location = useLocation()
  const [state, setState] = useState<'checking'|'ok'|'no'>('checking')
  useEffect(() => {
    const token = sessionStorage.getItem('lm_teacher_session')
    if (!token) { setState('no'); return }
    api.validateSession().then(() => setState('ok')).catch(() => { sessionStorage.removeItem('lm_teacher_session'); setState('no') })
  }, [])
  if (state === 'checking') return <PageLoading text="Checking teacher session…" />
  return state === 'ok' ? <Outlet /> : <Navigate to="/teacher/login" replace state={{ from: location.pathname }} />
}

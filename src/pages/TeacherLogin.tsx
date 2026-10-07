import { LockKeyhole } from '../components/Icons'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function TeacherLogin() {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await api.login(user.trim(), pass)
      sessionStorage.setItem('lm_teacher_session', result.sessionToken)
      navigate((location.state as { from?: string } | null)?.from || '/teacher')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <img
          className="login-logo"
          src="/assets/luwang-maheikol-logo.png"
          alt="Luwang Maheikol logo"
        />

        <h1>Teacher / Admin portal</h1>
        <p className="hint">
          Manage courses, notices, materials, gallery, videos and student enquiries.
        </p>

        <form className="form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="teacher-username">Username</label>
            <input
              id="teacher-username"
              required
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="teacher-password">Password</label>
            <input
              id="teacher-password"
              required
              type="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {error && (
            <div
              className="pill"
              style={{
                color: '#ffaaa8',
                background: 'rgba(255,100,100,.08)',
                borderColor: 'rgba(255,100,100,.15)',
              }}
            >
              <LockKeyhole size={13} />
              {error}
            </div>
          )}

          <button className="button primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

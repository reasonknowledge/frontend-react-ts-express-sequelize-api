import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/admins/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, pass })
      })
      const body = await res.json()
      if (!res.ok) {
        setError(body.error || 'Connexion échouée.')
        setLoading(false)
        return
      }
      setLoading(false)
      navigate('/home')
    } catch {
      setError("Erreur réseau lors de la connexion.")
      setLoading(false)
    }
  }

  return (
    <div className="flex border justify-center h-screen items-center">
      <div className="rounded-lg border p-3 shadow h-3/5 md:w-96 sm:h-3/4 w-full max-w-md">
        <div className="flex justify-center">
          <img src="./src/assets/signin .png" alt="" className="w-64 md:w-72 " />
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {error && <div className="rounded bg-red-100 text-red-700 p-2 text-center text-sm">{error}</div>}
          <Input
            placeholder="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="focus-bootstrap-shadow"
          />
          <Input
            placeholder="password"
            type="password"
            required
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="focus-bootstrap-shadow"
          />
          <Button
            disabled={loading}
            type="submit"
            className="bg-blue-100 text-gray-400 hover:bg-blue-200"
          >
            {loading ? "Connexion..." : "Connexion"}
          </Button>
        </form>
      </div>
    </div>
  )
}

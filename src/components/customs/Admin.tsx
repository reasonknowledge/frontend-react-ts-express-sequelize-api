export interface AdminProps {
  id: string
  nom: string
  email: string
  role: string
}

export default function Admin({ id, nom, email, role }: AdminProps) {
  return (
    <div className="rounded border p-4 bg-white shadow-md">
      <ul className="space-y-1">
        <li>ID: {id}</li>
        <li>Nom: {nom}</li>
        <li>Email: {email}</li>
        <li>Rôle: {role}</li>
      </ul>
    </div>
  )
}

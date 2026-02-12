export interface StudentProps {
  id: string
  nom: string
  prenom: string
  email: string
  annee?: number
}

export default function Student({ id, nom, prenom, email, annee }: StudentProps) {
  return (
    <div className="rounded border p-4 bg-white shadow-md">
      <ul className="space-y-1">
        <li>ID: {id}</li>
        <li>Nom: {nom}</li>
        <li>Prénom: {prenom}</li>
        <li>Email: {email}</li>
        <li>Année: {annee ?? 'Non renseignée'}</li>
      </ul>
    </div>
  )
}

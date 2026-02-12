import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Pen, Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { sonnerSuccesOptions } from '@/data/SonnerOptionStyle'

interface Student {
  id: string
  nom: string
  prenom: string
  email: string
  annee?: number
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [search, setSearch] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState<Student>({
    id: '',
    nom: '',
    prenom: '',
    email: '',
    annee: undefined,
  })

  const getStudents = () => {
    fetch('http://localhost:3000/api/students', {
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Erreur chargement des étudiants')))
      .then(list => setStudents(Array.isArray(list) ? list : []))
      .catch(() => setError('Erreur lors du chargement des étudiants'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getStudents()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'annee') {
      setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value, 10) : undefined }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleEdit = (student: Student) => {
    setFormData(student)
    setOpenDialog(true)
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/students/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          annee: formData.annee,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Erreur lors de la mise à jour')
        return
      }

      toast('Mise à jour réussie', sonnerSuccesOptions)
      setOpenDialog(false)
      getStudents()
    } catch (err) {
      toast.error('Erreur réseau lors de la mise à jour')
      console.error(err)
    }
  }

  const handleDelete = (id: string) => {
    setStudentToDelete(id)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return

    try {
      const res = await fetch(`http://localhost:3000/api/students/${studentToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Erreur lors de la suppression')
        return
      }

      toast('Suppression réussie', sonnerSuccesOptions)
      setOpenDeleteDialog(false)
      setStudentToDelete(null)
      getStudents()
    } catch (err) {
      toast.error('Erreur réseau lors de la suppression')
      console.error(err)
    }
  }

  const filteredStudents = students.filter(student =>
    student.nom.toLowerCase().includes(search.toLowerCase()) ||
    student.prenom.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex squareBackground min-h-screen flex-col items-center p-6 md:p-12 w-full ">
      <div className="w-3/5 flex flex-col gap-6">
        <div className="relative">
          <Input placeholder="Rechercher un étudiant par nom, prénom ou email" className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          <Search size={18} color="gray" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        {loading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Modifier</TableHead>
                <TableHead>Retirer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Aucun étudiant trouvé.</TableCell>
                </TableRow>
              ) : filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.nom}</TableCell>
                  <TableCell>{student.prenom}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.annee ?? 'Non renseignée'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(student)} className="bg-gray-50 hover:bg-white hover:cursor-pointer">
                      <Pen size={18} color="black" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(student.id)}
                      className="bg-gray-50 hover:bg-white hover:cursor-pointer"
                    >
                      <Trash2 size={18} color="black" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Modifier l'étudiant</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleInputChange} />
              <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleInputChange} />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              <Input name="annee" type="number" placeholder="Année (optionnel)" value={formData.annee || ''} onChange={handleInputChange} />
              <Button onClick={handleUpdate} className="mt-2">
                Mettre à jour
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <p>Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette action est irréversible.</p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpenDeleteDialog(false)} className='hover:cursor-pointer'>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleConfirmDelete} className='hover:cursor-pointer'>
                  Supprimer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

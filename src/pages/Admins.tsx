import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Pen, Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { sonnerSuccesOptions } from '@/data/SonnerOptionStyle'

interface Admin {
  id: string
  nom: string
  email: string
  role: string
}

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [search, setSearch] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState<Admin>({
    id: '',
    nom: '',
    email: '',
    role: '',
  })

  const getadmins = () => {
    fetch('http://localhost:3000/api/admins', {
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Erreur chargement des admins')))
      .then(list => setAdmins(Array.isArray(list) ? list : []))
      .catch(() => setError('Erreur lors du chargement des admins'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getadmins()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (admin: Admin) => {
    setFormData(admin)
    setOpenDialog(true)
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/admins/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          role: formData.role,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Erreur lors de la mise à jour')
        return
      }

      toast('Mise à jour réussie', sonnerSuccesOptions)
      setOpenDialog(false)
      getadmins()
    } catch (err) {
      toast.error('Erreur réseau lors de la mise à jour')
      console.error(err)
    }
  }

  const handleDelete = (id: string) => {
    setAdminToDelete(id)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (!adminToDelete) return

    try {
      const res = await fetch(`http://localhost:3000/api/admins/${adminToDelete}`, {
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
      setAdminToDelete(null)
      getadmins()
    } catch (err) {
      toast.error('Erreur réseau lors de la suppression')
      console.error(err)
    }
  }

  const filteredAdmins = admins.filter(adm =>
    adm.nom.toLowerCase().includes(search.toLowerCase()) ||
    adm.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex squareBackground min-h-screen flex-col items-center p-6 md:p-12 w-full ">
      <div className="w-3/5 flex flex-col gap-6">
        <div className="relative">
          <Input placeholder="Rechercher un admin par nom ou email" className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
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
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Modifier</TableHead>
                <TableHead>Retirer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Aucun admin trouvé.</TableCell>
                </TableRow>
              ) : filteredAdmins.map(admin => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.nom}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(admin)} className="bg-gray-50 hover:bg-white hover:cursor-pointer">
                      <Pen size={18} color="black" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(admin.id)}
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
              <DialogTitle>Modifier l'admin</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleInputChange} />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              <Input name="role" placeholder="Rôle" value={formData.role} onChange={handleInputChange} />
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
              <p>Êtes-vous sûr de vouloir supprimer cet admin ? Cette action est irréversible.</p>
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

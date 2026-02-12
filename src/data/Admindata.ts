export interface AdminData {
  id: string
  nom: string
  email: string
  pass: string
  role: string
}

export const admins: AdminData[] = [
  {
    id: '1',
    nom: 'Dupont',
    email: 'dupont.admin@email.com',
    pass: 'pass1234',
    role: 'admin'
  },
  {
    id: '2',
    nom: 'Martin',
    email: 'martin.admin@email.com',
    pass: 'motdepasse',
    role: 'admin'
  },
  {
    id: '3',
    nom: 'Durand',
    email: 'durand.admin@email.com',
    pass: 'adminpass',
    role: 'admin'
  },
  {
    id: '4',
    nom: 'Bernard',
    email: 'bernard.admin@email.com',
    pass: 'bernard123',
    role: 'admin'
  },
  {
    id: '5',
    nom: 'Petit',
    email: 'petit.admin@email.com',
    pass: 'superpetit',
    role: 'admin'
  },
  {
    id: '6',
    nom: 'Robert',
    email: 'robert.admin@email.com',
    pass: 'robertpass',
    role: 'admin'
  },
  {
    id: '7',
    nom: 'Richard',
    email: 'richard.admin@email.com',
    pass: 'secretpassword',
    role: 'admin'
  },
  {
    id: '8',
    nom: 'Dubois',
    email: 'dubois.admin@email.com',
    pass: 'mdpdubois',
    role: 'admin'
  },
  {
    id: '9',
    nom: 'Moreau',
    email: 'moreau.admin@email.com',
    pass: 'moreaupass',
    role: 'admin'
  },
  {
    id: '10',
    nom: 'Laurent',
    email: 'laurent.admin@email.com',
    pass: 'laurent42',
    role: 'admin'
  },
]

import { Link, } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'


export default function Navigation() {
  return (
    <nav className="bg-gray-200 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Gestion Est</div>
        <div className="flex space-x-6 items-center">
          <Link to="/home" className="hover:text-white transition">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:text-white hover:cursor-pointer transition px-2 py-1 rounded focus:outline-none">
              <div className='flex gap-3 items-center'>
                <div>Admins</div>
                <ChevronDown size={14} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/admins">Lister les admins</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup">Ajouter un admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:text-white hover:cursor-pointer transition px-2 py-1 rounded focus:outline-none">
              <div className='flex gap-3 items-center'>
                <div>Etudiants</div>
                <ChevronDown size={14} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/etudiants">Lister les étudiants</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/student">Ajouter un étudiant</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Link to="/connexion" className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition">
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  )
}

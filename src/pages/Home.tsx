// src/pages/Home.tsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full relative">
        <img src="./src/assets/bureau.jpg" alt="" className="h-screen w-svw object-cover" />
        <button className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-20 text-white text-xl bg-black/60 px-8 py-4 rounded-lg shadow-lg">
          Gestion Estudiantine gérer vos étudiants facilement
        </button>
      </div>
      <div className="py-16 text-3xl">Votre Gestion Facile</div>
      <div>
      <div className="gap-3 grid grid-cols-2 items-center justify-center p-12">
        <img src="./src/assets/Mockup1.png" alt="" className=" object-cover border rounded-lg shadow" />
        <div className="flex text-center flex-col items-center ">
        <div className="w-3/4 flex flex-col gap-4 ">
          <div className="text-3xl">Gérer vos inscription sécurisé</div>
            Creéz des adminstrateur de facon centrentralé .Tout admin ajouté ne peut etre ajouté que par des administrateur ayant deja accès
          </div>
        </div>
      </div>

      <div className="gap-3 grid grid-cols-2 items-center justify-center p-12">
        <div className="flex text-center flex-col items-center ">
        <div className="w-3/4 flex flex-col gap-4 ">
          <div className="text-3xl">Gérer vos inscription sécurisé</div>
            Creéz des adminstrateur de facon centrentralé .Tout admin ajouté ne peut etre ajouté que par des administrateur ayant deja accès
          </div>
        </div>
        <img src="./src/assets/Mockup2.png" alt="" className=" object-cover border rounded-lg shadow" />
      </div>
      </div>

      <div className="justify-center flex flex-col items-center gap-4 pt-20">
        <div className="text-3xl">Gerer vos etudiants</div>
        <div>Ajoutez , Modifiez ,retirez les etudiants.</div>
      <img src="./src/assets/Mockup5.png" alt="" className=" object-cover w-3/5 rounded-lg shadow" />
      </div>

      <footer className="mt-12 py-32 bg-gray-200 text-center text-gray-500 ">
        <p>© 2025 MonApp. Tous droits réservés.</p>
      </footer>
    </div>
  )
}

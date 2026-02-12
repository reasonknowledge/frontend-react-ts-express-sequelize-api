import React, { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signupSchema = z.object({
  nom: z.string().min(6, "Le nom doit contenir au moins 6 caractères"),
  email: z.email("Email invalide"),
  pass: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type SignupData = z.infer<typeof signupSchema>;



export default function Signup() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const raw = {
      nom: (form.get("nom") ?? "") as string,
      email: (form.get("email") ?? "") as string,
      pass: (form.get("pass") ?? "") as string,
    };

    const parsed = signupSchema.safeParse(raw);

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);

      const fieldErrors = Object.fromEntries(
        Object.entries(tree.properties ?? {}).flatMap(([key, prop]) =>
          prop?.errors?.length ? [[key, prop.errors[0]]] : []
        )
      ) as Record<string, string>;

      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    const dataToSend: SignupData = parsed.data;

    const signupPromise = async () => {
      const res = await fetch("http://localhost:3000/api/admins/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      let responseData = null;
      const contentType = res.headers.get("content-type");
      
      if (contentType?.includes("application/json")) {
        responseData = await res.json();
      } else {
        await res.text();
      }

      if (!res.ok) {
        let errorMessage = "Erreur lors de l'inscription.";
        
        if (res.status === 401) {
          errorMessage = "Vous devez être connecté en tant qu'admin pour créer un nouvel admin.";
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        }
        
        throw new Error(errorMessage);
      }

      formElement.reset();
      setErrors({});
    
      return responseData;
    };

    toast.promise(
      signupPromise(),
      {
        loading: "Inscription en cours...",
        success: () => {
          setTimeout(() => navigate("/home"), 1500);
          return "Admin créé avec succès !";
        },
        error: (err) => {
          if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
            return "Impossible de se connecter au serveur. Vérifiez que le backend est démarré.";
          }
          return err.message || "Erreur lors de l'inscription.";
        },
      }
    );

    // Réinitialiser isSubmitting après un délai
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen  p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl">
        <div className="hidden md:block">
          <img
            src="/src/assets/professors.png"
            alt="Professeurs"
            className="w-full  object-contain rounded-lg"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md p-8 border rounded-lg shadow-lg bg-white"
          noValidate
        >
          <h1 className="text-2xl font-semibold text-center mb-4">
            Inscription Admin
          </h1>

          <div>
            <Input name="nom" placeholder="Nom" className="w-full focus-bootstrap-shadow" />
            {errors.nom && <p className="text-sm text-red-600 mt-1">{errors.nom}</p>}
          </div>

          <div>
            <Input name="email" type="email" placeholder="Email" className="w-full focus-bootstrap-shadow" />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <Input name="pass" type="password" placeholder="Mot de passe" className="w-full focus-bootstrap-shadow" />
            {errors.pass && <p className="text-sm text-red-600 mt-1">{errors.pass}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-300 text-white hover:bg-blue-400 disabled:opacity-50 hover:cursor-pointer mt-2"
          >
            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>
      </div>
    </div>
  );
}
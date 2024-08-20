'use client';

import { useEffect, useState } from "react";
import { Recipe } from "../../../components/tableRecipe/columns"
import Card from "../../../components/cardRecipe/cardRecipes";
import { columns } from "../../../components/tableRecipe/columns"
import { DataTable } from "../../../components/tableRecipe/DataTable"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../../../public/logo_windel.png"
import { table } from "console";
import { useRouter } from 'next/navigation';
import DialogDeleteRecipe from "@/components/dialog/deleteDialog";


const url = "https://teste-tecnico-front-api.up.railway.app/recipe"


export default function ListRecipe() {

  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog]= useState(false)
  const [data, setData] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleEditClick = (id: number) => {
    router.push(`${id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const result: Recipe[] = await response.json()
        setData(result)
      } catch (error) {
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [data])

 const deleteRecipe = async (id: number) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }
      setData(prevData => prevData.filter(recipe => recipe.id !== id));
    } catch (error) {
      setError("Failed to delete recipe");
    }
  };
 

  if (loading) return <div className="flex justify-center h-[600px] items-center"><Image src={Logo} alt="Logo Gpdv" width={160}/></div>
  if (error) return <div>{error}</div>

  return (
    <div className="container mx-auto py-10">
      <div className="hidden md:block">
         <DataTable columns={columns} data={data} onDelete={deleteRecipe}/>
      </div>

      <div className="p-6 max-w-2xl mx-auto block md:hidden">
          <h1 className="text-[50px] font-sans font-bold">Receitas</h1>
          {data.length === 0 ? (
            <div className="flex justify-center h-[600px] items-center">
              <div className="space-y-2 ">
                <Image src={Logo} alt="Logo Gpdv" width={160}/>
                <p>Sem receitas para exibir</p>
              </div> 
            </div>
          ) : (
            <ul className="">
              {data.map((recipe) => (
                <Card
                    id={recipe.id}
                    name={recipe.name}
                    description={recipe.description}
                    category={recipe.category}
                    ingredients={recipe.ingredients}
                    isFavorite={recipe.isFavorite}
                    onDelete={deleteRecipe}
                    handleEditClick={handleEditClick}
                  />
              ))}
            </ul>
          )}
    </div>
    </div>
  )
}

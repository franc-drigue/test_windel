'use client';

import { useEffect, useState } from "react";
import { Recipe } from "../../../components/tableRecipe/DataTable";
import CardRecipe from "../../../components/cardRecipe/cardRecipes";
import { TableRecipes } from "../../../components/tableRecipe/DataTable";
import Image from "next/image";
import Logo from "../../../../public/logo_windel.png";
import AnimationData from "../../../../public/Animation.json";
import { useRouter } from 'next/navigation';
import { Drawer } from "@/components/drawer/drawer";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";

const url = "https://teste-tecnico-front-api.up.railway.app/recipe";

export default function ListRecipe() {

  const router = useRouter();
  const [dataRecipe, setData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRecipeName, setFilter] = useState("");

  const handleEditClick = (id: number) => {
    router.push(`${id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: Recipe[] = await response.json();
        setData(result);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dataRecipe]);

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

  const filteredData = dataRecipe.filter(recipe => 
    recipe.name.toLowerCase().includes(filterRecipeName.toLowerCase())
  );

  if (loading) return <div className="flex justify-center h-[900px] items-center"><Image src={Logo} alt="Logo Windel" width={160}/></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-10 mt-[50px]">
      <Drawer/>
      <div className="hidden md:block">
      <Input
          type="text"
          placeholder="Busque pelo o nome da receita"
          value={filterRecipeName}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 mb-2 mt-4 w-[350px]"
        />
        <TableRecipes
          handleEditClick={handleEditClick}
          recipes={filteredData}
          onDelete={deleteRecipe}
        />
      </div>
      <div className="p-6 max-w-2xl mx-auto block md:hidden">
        <h1 className="text-[50px] font-sans font-bold">Receitas</h1>
        <Input
          type="text"
          placeholder="Busque pelo o nome da receita"
          value={filterRecipeName}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 mb-2 mt-4 w-full"
        />
        {filteredData.length === 0 ? (
          <div className="flex justify-center h-[400px] items-center">
            <div className="space-y-2 flex flex-col justify-center items-center">
              <Lottie
                 style={{width: 200}}
                 animationData={AnimationData}/>
              <p>Sem receitas para exibir</p>
            </div>
          </div>
        ) : (
          <ul>
            {filteredData.map((recipe) => (
              <CardRecipe
                key={recipe.id}
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
  );
}

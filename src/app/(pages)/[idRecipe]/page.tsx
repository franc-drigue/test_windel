'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/components/tableRecipe/DataTable';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer } from "@/components/drawer/drawer";
import Logo from "../../../../public/logo_windel.png"
import Image from 'next/image';

interface Props {
  params: { idRecipe: number };
}

type ingredient = {
  name: string;
  quantity: number;
}

const url = "https://teste-tecnico-front-api.up.railway.app/recipe";

export default function EditRecipe({ params }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${url}/${params.idRecipe}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.idRecipe]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Recipe) => {
    if (recipe) {
      setRecipe({
        ...recipe,
        [field]: e.target.value,
      });
    }
  };

  const handleIngredientChange = (index: number, field: keyof ingredient, value: string | number) => {
    if (recipe) {
      const newIngredients = [...recipe.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: field === 'quantity' ? Number(value) : value,
      };
      setRecipe({ ...recipe, ingredients: newIngredients });
    }
  };


  const handleCheckboxChange = () => {
    if (recipe) {
      setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const request = await fetch(`${url}/${params.idRecipe}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe),
      });
      if (!request.ok) {
        throw new Error('Failed to update recipe');
      }
      router.push('/list');
    } catch (err) {
      console.log(err);
    }
  };


  if (loading) return <div className="flex justify-center h-[900px] items-center"><Image src={Logo} alt="Logo Gpdv" width={160}/></div>;
  if (!recipe) return <div>No recipe found</div>;


  return (
    <div className='flex flex-col justify-center h-[100vh] items-center'>
      <Drawer/>
      <div className='min-w-[500px] flex justify-start font-sans font-black text-[40px] mb-4 p-3 mx-auto max-w-2xl'>
        <h1>Edite sua receita</h1>
      </div>
      <form className='flex flex-col space-y-4 w-[500px]  bg-slate-50 p-4 rounded-md shadow-md' onSubmit={handleSubmit}>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Name:</label>
          <Input
            type="text"
            name="name"
            value={recipe.name}
            onChange={(e) => handleChange(e, 'name')}
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Description:</label>
          <Textarea
            name="description"
            value={recipe.description}
            onChange={(e) => handleChange(e, 'description')}
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Category:</label>
          <Input
            type="text"
            name="category"
            value={recipe.category}
            onChange={(e) => handleChange(e, 'category')}
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Ingredients e quantidades:</label>
            <div className='h-[150px] overflow-y-auto'>
                <ul className='pl-5 py-1'>
                  {recipe.ingredients.map((ingredient, index) => (
                    <>
                      <li key={index} className='text-sm text-gray-800'>
                      <Input
                        className='mb-2 mt-2'
                        type='text'
                        name='name'
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      />
                      <Input
                        className='mb-5'
                        type='tex'
                        name='quantity'
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      />
                    </li>
                    </>  
                  ))}
                </ul>
          </div>
        </div>
        <div>
          <label className='flex items-center'>
            <Checkbox
              name="isFavorite"
              checked={recipe.isFavorite}
              onCheckedChange={handleCheckboxChange}
            />
            <span className='ml-2 text-sm font-medium text-gray-700'>Favorito:</span>
          </label>
        </div>
        <Button type="submit" className='mt-4 bg-[#1347A8] hover:bg-[#1347a8da]'>Salvar</Button>
      </form>
    </div>
  );
}

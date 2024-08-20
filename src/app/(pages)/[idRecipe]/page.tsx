'use client';

import { useEffect, useState } from 'react';
import { Recipe } from '@/components/tableRecipe/columns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  params: { idRecipe: number };
}

const url = "https://teste-tecnico-front-api.up.railway.app/recipe";

export default function EditRecipe({ params }: Props) {

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.idRecipe]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>No recipe found</div>;

  return (
    <div className='flex justify-center h-[100vh] items-center'>
      <form className='flex flex-col space-y-4 w-[500px]'>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Name:</label>
          <Input type="text" defaultValue={recipe.name} />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Description:</label>
          <Textarea defaultValue={recipe.description} />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Category:</label>
          <Input type="text" defaultValue={recipe.category} />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>Ingredients:</label>
          <ul className='pl-5 py-1'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className='text-sm text-gray-800'>
                <Input className='mb-2 mt-2' type='text' defaultValue={ingredient.name}/>
                <Input type='number' defaultValue={ingredient.quantity}/> 
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label className='flex items-center'>
            <Checkbox defaultChecked={recipe.isFavorite} />
            <span className='ml-2 text-sm font-medium text-gray-700'>Favorite:</span>
          </label>
        </div>
        <Button type="submit" className='mt-4'>Save</Button>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster"
import { Drawer } from '@/components/drawer/drawer';

const url = 'https://teste-tecnico-front-api.up.railway.app/recipe';

export default function Register() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [ingredients, setIngredients] = useState<{ name: string; quantity: number }[]>([]);
  const [category, setCategory] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [responseRecipe, setResponseRecipe] = useState<any>(null);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const data = {
      name,
      description,
      ingredients: ingredients.map(ingredient => ({
        name: ingredient.name,
        quantity: ingredient.quantity
      })),
      category,
      isFavorite
    };


    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      setResponseRecipe(result);
      toast({
        title: 'Cadastro concluído',
        description: 'Ingrediente adicionado',
        duration: 5000, 
      });
      setIsFavorite(false)
      setName("");
      setDescription("");
      setIngredientName("");
      setIngredientQuantity("");
      setCategory("")
    } catch (err) {
      toast({
        title: 'Campos vazios',
        description: 'preencha os campos para cadastrar a recita',
        duration: 5000, 
      });
    }
  };


const handleCheckbox = () => {
  setIsFavorite(!isFavorite)
}

  const addIngredient = () => {
    if (ingredientName && ingredientQuantity) {
      setIngredients([...ingredients, { name: ingredientName, quantity: parseFloat(ingredientQuantity) }]);
      setIngredientName(''); 
      setIngredientQuantity('');
      toast({
        title: 'Ingrediente adicionado',
        description: `Adicionado: ${ingredientName}, Quantidade: ${ingredientQuantity}`,
        duration: 3000,
      });
    } else if( ingredientName === "" ) {
      toast({
        title: `Preencha o nome do Ingrediente`,
        description: 'Informe a quantidade do ingrediente',
        duration: 3000, 
      });
      return
    }else if ( ingredientQuantity === "") {
      toast({
        title: 'Quantidade inválida',
        description: 'Informe a quantidade do ingrediente',
        duration: 3000, 
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-[100px]">
      <Drawer/>
      <div className='min-w-[500px] flex justify-start font-sans font-black text-[40px] mb-4'>
         <h1>Cadastre uma Receita</h1> 
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-md shadow-md">
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Nome
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Descrição
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Nome do ingrediente 
            <Input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block font-medium text-gray-700">
            Quantidade
            <Input
              type="number"
              value={ingredientQuantity}
              onChange={(e) => setIngredientQuantity(e.target.value)}
              className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
          <Button
            type="button"
            onClick={addIngredient}
            className="bg-[#1347A8] text-white hover:bg-[#1347a8da] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Adicionar ingrediente
          </Button>
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Categoria
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
             checked={isFavorite}
             onCheckedChange={handleCheckbox} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            É sua receita favorita ?
          </label>
        </div>
        </div>
        <Button
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Cadastrar
        </Button>
      </form>
      {ingredients && <Toaster/>}
      {responseRecipe && <Toaster/>}
    </div>
  );
}

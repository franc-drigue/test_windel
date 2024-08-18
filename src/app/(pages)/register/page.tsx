'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://teste-tecnico-front-api.up.railway.app';

export default function Register() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ id: uuidv4(), name: '', quantity: '' }]);
  const [category, setCategory] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name,
      description,
      ingredients,
      category,
      isFavorite,
    };

    try {
      const res = await fetch(`${API_URL}/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError('Failed to make POST request');
      console.error(err);
    }
  };

  const handleIngredientChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [name]: value };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { id: uuidv4(), name: '', quantity: '' }]);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Name
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
            Description
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </div>
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="space-y-2">
            <label className="block font-medium text-gray-700">
              Ingredient Name
              <Input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block font-medium text-gray-700">
              Quantity
              <Input
                type="number"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
        ))}
        <Button
          type="button"
          onClick={addIngredient}
          className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Ingredient
        </Button>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">
            Category
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={isFavorite}
            onChange={(e:any) => setIsFavorite(e.target.checked)}
            className="h-5 w-5"
          />
          <label className="font-medium text-gray-700">Is Favorite</label>
        </div>
        <Button
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Submit
        </Button>
      </form>
      {response && <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(response, null, 2)}</pre>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

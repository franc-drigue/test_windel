"use client"

import { Button } from "../ui/button";
import { Trash2 } from 'lucide-react';

type ingredient = {
    name: string;
    quantity: number;
}


export type cardRecipes = {
    id: number;
    name: string;
    description: string;
    category: string;
    ingredients: { name: string; quantity: number }[];
    isFavorite: boolean;
    onDelete: (id: number) => void; 
}

const url = "https://teste-tecnico-front-api.up.railway.app/recipe"



export default function Card({ id, name, description, category, ingredients, isFavorite, onDelete } : cardRecipes){

    
    return(
        <div className="py-2">
            
            <div className="bg-gray-100 shadow-slate-400 shadow-sm rounded-md p-3 flex justify-between">
                <div>
                    <h1 className="text-[20px] font-sans font-medium">{name}</h1>
                    <p>{description}</p>
                    <h4 className="font-semibold">Ingredientes e Quantidades:</h4>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index} >
                              <span>{`${ingredient.name}: ${ingredient.quantity}`}</span>
                            </li>
                        ))}
                    </ul>
                    <p><span className="font-semibold">Tipo: </span> {category}</p>
                    <p><span className="font-semibold">Favorito: </span>{isFavorite ? "sim" : "não"}</p>
                </div>
                <div>
                  <Button onClick={() => onDelete(id)}>
                     <Trash2 />
                  </Button>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}
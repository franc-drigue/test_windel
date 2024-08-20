"use client"

import { Button } from "../ui/button";
import { Link, Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import DialogDeleteRecipe from "../dialog/deleteDialog";
import { useState } from "react";

type ingredient = {
    name: string;
    quantity: number;
}


export type cardRecipes = {
    id: number;
    name: string;
    description: string;
    category: string;
    ingredients: ingredient[];
    isFavorite: boolean;
    onDelete: (id: number) => void; 
    handleEditClick: (id: number) => void; 
}





export default function Card({ id, name, description, category, ingredients, isFavorite, onDelete, handleEditClick } : cardRecipes){

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteConfirm = () => {
      onDelete(id);
      setDialogOpen(false);
    };
  
    
    return(
        <div className="py-2">
            <div className="bg-gray-100 shadow-slate-400 shadow-sm rounded-md p-3 flex justify-between">
                <div>
                    <h1 className="text-[27px] font-sans font-medium">{name}</h1>
                    <p>{description}</p>
                    <h4 className="font-semibold">Ingredientes e Quantidades:</h4>
                    <ul className="list-disc pl-7">
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                              <span>{`${ingredient.name}: ${ingredient.quantity}`}</span>
                            </li>
                        ))}
                    </ul>
                    <p><span className="font-semibold">Tipo: </span> {category}</p>
                    <p><span className="font-semibold">Favorito: </span>{isFavorite ? "sim" : "não"}</p>
                </div>
                <div className="space-y-3">
                    <div>
                    <Button onClick={() => setDialogOpen(true)}>
                        <Trash2/>
                    </Button>
                    </div>
                    <div>
                    <Button onClick={() => handleEditClick(id)}>
                          <Pencil/>
                    </Button>
                    </div>
                </div>
            </div>
            <div>
              <DialogDeleteRecipe 
                open={dialogOpen} 
                onClose={() => setDialogOpen(false)} 
                onDelete={() => handleDeleteConfirm()}
               />
            </div>
        </div>
    )
}
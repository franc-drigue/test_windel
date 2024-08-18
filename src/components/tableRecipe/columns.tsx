import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";


type ingredients = {
    name: string;
    quantity: number;
}


export type Recipe = {
    id: number;
    name: string;
    description: string;
    ingredients: ingredients[];
    category: string;
    isFavorite: boolean
}

export const columns: ColumnDef<Recipe>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      accessorKey: "ingredients",
      header: "Ingredientes",
      cell: info => (
        <div>
          {info.getValue<any>().map((ingredient: ingredients, index: number) => (
            <div key={index}>
              {ingredient.name}:
              {ingredient.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Categoria",
    },
    {
      accessorKey: "isFavorite",
      header: "Favorita",
      cell: info => (
        info.getValue() ? "Sim" : "Não"
      ),
    },
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  ]

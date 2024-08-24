"use client"


import { Button } from "@/components/ui/button"
import { ClipboardPen } from 'lucide-react';
import { ClipboardList } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { AlignJustify } from 'lucide-react';



export function Drawer() {

  const pathname = usePathname();

  return (
    <div className="fixed z-50 left-10 top-10">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="bg-[#1347A8] hover:bg-[#1347a8da]">
          <AlignJustify/>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-[40px] font-sans ">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-[20px]">
          <div className="">
             <Link 
               href={"/list"} 
               className= {`${pathname.startsWith("/list") ? "bg-[#1347A8] text-white p-3 block font-sans font-semibold" : "bg-slate-50 p-3 block"}`}
             >
             <div className="flex justify-between items-end">
                <p className="text-[20px]">Lista de Receitas</p> 
                <ClipboardList size={30}/>
             </div>
             </Link>
          </div>
          <div className="">
             <Link 
              href={"/register"} 
              className= {`${pathname.startsWith("/register") ? "bg-[#1347A8] text-white p-3 block font-sans font-semibold" : "bg-slate-50 p-3 block"}`}
              >
             <div className="flex justify-between items-end">
                <p className="text-[20px]">Nova receita</p> 
                <ClipboardPen size={30}/>
             </div>
             </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    </div>
  )
}

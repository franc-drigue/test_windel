import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../public/logo_windel.png";
import LogoSmart from "../../public/logo_windel.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSquareWhatsapp, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";


export default function Login() {
    return(
        <div className="h-[100vh] flex justify-around items-center md:space-x-4 sm:space-x-4 lg:space-x-4">
           <div className="bg-[#F8F8FF] h-[100vh] w-[100vw] hidden sm:visible lg:visited: md:visible sm:flex md:flex lg:flex flex-col justify-center items-center p-[10px] bg-login_background bg-cover bg-center shadow-custom-right">
               <div className="flex flex-col items-center mb-[35px]">
                    <Image
                        src={Logo}
                        alt="Logo Gpdv"
                        width={300}
                        className="lg:w-[300px] xs:w-[1px]"
                    />
                    <h1 className="md:text-[55px] lg:text-[70px] font-sans font-bold text-[#898989] text-center mt-[10px]">TESTE WINDEL</h1>
               </div>
               <div className="absolute bottom-6">
                  <p className="text-[#575757] text-center">Developed by F. Rodrigues</p>
               </div>
           </div>
           <div className="w-[100vw] flex flex-col justify-center items-center">
                <div className="md:hidden lg:hidden sm:hidden  mb-[50px]">
                   <Image
                        src={Logo}
                        alt="Logo Gpdv"
                        width={160}
                        
                    />
                </div>
                <div className="space-y-9 bg-[FFFFFF] p-[25px] w-[500px] rounded-md shadow-lg">
                    <h2 className="text-[60px] font-sans font-bold text-[#BE495E] ">Login</h2>
                    <div className="flex items-center">
                        <div className="p-[10px] bg-[#1347A8]">
                          <FontAwesomeIcon icon={faUser} className="w-[20px] text-white"/>
                        </div>
                        <Input 
                         type="text" 
                         placeholder="usuário" 
                         className="border border-gray-300 rounded-none py-[21px] px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                         />
                    </div>
                    <div  className="flex items-center">
                        <div className="p-[10px] bg-[#1347A8]">
                          <FontAwesomeIcon icon={faLock} className="w-[20px] text-white"/>
                        </div>
                        <Input 
                         type="password" 
                         placeholder="senha" 
                         className="border border-gray-300 rounded-none py-[21px] px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                         />
                    </div>
                    <div>
                        <Link href={'/list'}>
                           <Button className="w-full mt-4 bg-[#1347A8] hover:bg-[#1347a8da]">Entrar</Button>
                        </Link>
                       
                    </div>
                </div>
                <div className="pt-[20px] space-y-1 md:absolute md:bottom-6">
                   <p className="text-center mb-3 text-[#575757]">Entre em contato <br></br>
                   conosco pela as redes sociais</p>
                   <div className="flex justify-center gap-3 ">
                        <a href="">
                            <FontAwesomeIcon icon={faSquareWhatsapp} className="w-[30px] text-[#BE495E] hover:text-[#be495ede]"/>
                        </a> 
                        <a href="">
                            <FontAwesomeIcon icon={faSquareInstagram} className="w-[30px] text-[#BE495E] hover:text-[#be495ede]"/>
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faSquareEnvelope} className="w-[30px] text-[#BE495E] hover:text-[#be495ede]"/>
                        </a>
                   </div>
                </div>
           </div>
        </div>
    )
}
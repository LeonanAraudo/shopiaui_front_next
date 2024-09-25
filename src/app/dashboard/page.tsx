import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Dados(){
   const session = await getServerSession()
   
   if(!session){
   return redirect('/')
   }

    return(
        <>
        <h1>Olá ...{session.user?.name}</h1>
        <h1>Olá ...{session.user?.email}</h1>
        <h1>Olá ...{session.user?.image}</h1>
        </>

    )
} 
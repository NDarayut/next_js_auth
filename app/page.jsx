import Navbar from "@/components/Navbar";
import LoginBtn from "@/components/LoginBtn";
import RecipeCard from "@/components/RecipeCard";
import CustomCarousel from "@/components/CustomCarousel";
import SearchBar from "@/components/SearchBar";
import RandomCard from "@/components/RandomCard";
import LogoutBtn from "@/components/LogoutBtn";


export default async function Home() {


  return (
    <>
    
      <div className="sticky top-0 bg-customYellow z-50 px-[60px]">
          <div className="mt-3 flex justify-end">
            <LoginBtn></LoginBtn>
          </div>

          <div className="mt-3 flex justify-end">
            <LogoutBtn></LogoutBtn> 
          </div>
    
          <Navbar></Navbar>
      </div>
      <main className="px-[60px]">

        <div className="mb-11">
          <SearchBar></SearchBar>
        </div>
        

        <div className="mb-28">
          <CustomCarousel></CustomCarousel>
        </div>
        
        <h1 className="font-serif text-[40px]">Popular Dishes</h1>
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">
          
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          <RecipeCard></RecipeCard>
          
        </article>

        <h1 className="font-serif text-[40px]">Random recipe</h1>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10 p-4 mb-11">
          
          <RandomCard></RandomCard>
          <RandomCard></RandomCard>
          <RandomCard></RandomCard>
          <RandomCard></RandomCard>
          
        </article>

      </main>

      
    </>
    
  )
}

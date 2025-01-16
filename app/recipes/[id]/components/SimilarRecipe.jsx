import RelatedCard from "./RelatedCard";

export default function SimilarRecipe({loading, error, similarRecipes}) {
    return <div>
      <h2 className="font-[700] font-serif text-[25px] mb-4 mt-12">Similar Recipes</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-y-auto max-h-[700px] grid grid-cols-1 gap-x-6 gap-y-8" style={{ scrollBehavior: "smooth" }}>
        {similarRecipes.length > 0 ? (
          similarRecipes.map((recipe) => (
            <RelatedCard
              key={recipe._id}
              recipeId={recipe._id}
              src={recipe.image} // Image URL
              title={recipe.title} // Recipe title
              averageRating={recipe.averageRating} />
          ))
        ) : (
          !loading && <p>No similar recipes found.</p>
        )}
      </div>
    </div>
  }
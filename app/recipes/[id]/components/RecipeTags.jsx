export default function RecipeTags({tags}) {
    return <div>
      <h2 className="font-[700] font-serif text-[25px] mt-6 mb-2">Recipe Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.dishTypes.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
          >
            {tag}
          </span>
        ))}
  
        {tags.cuisines.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
          >
            {tag}
          </span>
        ))}
  
      </div>
    </div>
  }
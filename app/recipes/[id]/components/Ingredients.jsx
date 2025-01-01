export default function Ingredients({ingredients}) {
    return <div>
      <h1 className="font-[700] font-serif text-[25px] my-2">Ingredients</h1>
      <ul className="pl-5 space-y-3">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-center text-[18px]">
            <span
              className="mr-3 w-5 h-5 flex items-center justify-center border-2 border-gray-500 rounded-full" />
            <span className={`${ingredient.completed ? 'line-through text-gray-400' : ''}`}>
              {ingredient.amount} {ingredient.unit} of {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  }
export default function KeyInformation({prepTime, numberOfIngredients, calories}) {
    return <div className="flex flex-row gap-8 text-18 mt-[50px]">
      <div className="flex flex-col font-light">
        PREP TIME
        <div className="text-customDarkGreen font-bold">
          {prepTime} MIN
        </div>
      </div>
  
      <div className="border-r-1 border-customGreen" />
  
      <div className="flex flex-col font-light">
        INGREDIENTS:
        <div className="text-customDarkGreen font-bold">
          {numberOfIngredients}
        </div>
      </div>
  
      <div className="border-r-1 border-customGreen" />
  
      <div className="flex flex-col font-light">
        CALORIES:
        <div className="text-customDarkGreen font-bold">
          {calories} kcal
        </div>
  
      </div>
    </div>
}
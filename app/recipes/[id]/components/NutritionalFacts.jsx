"use client";

export default function NutritionalFacts({ nutrition }) {
  if (!nutrition || nutrition.length === 0) {
    return (
      <div className="p-4 bg-customWhite border border-gray-300 rounded-lg shadow-md">
        <h2 className="font-[700] font-serif text-[25px] text-customDarkGreen">Nutritional Facts</h2>
        <p className="text-sm text-gray-500">Nutrition information is not available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 py-14 bg-customWhite border border-gray-300 rounded-lg shadow-md w-[350px]">
      <h2 className="font-[700] font-serif text-[25px] text-customDarkGreen">Nutritional Facts</h2>
      <ul className="mt-2 space-y-1 text-base text-customDarkGreen">
        {nutrition.map((nutrient) => (
          <li key={nutrient.name} className="flex justify-between">
            <span className="my-1 text-left">{nutrient.name}</span>
            <span className="my-1 text-right">
              {nutrient.amount} {nutrient.unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Image from "next/image";

// components/IngredientRow.jsx
const IngredientForm = ({ index, ingredient, handleChange, removeIngredient }) => (
  <tr key={index}>
    <td>
      <input
        value={ingredient.name}
        onChange={(e) => handleChange(index, "name", e.target.value)}
        placeholder="Ingredient Name"
        className="bg-customYellow py-3 px-4 text-left font-medium" 
      />
    </td>
    <td>
      <input
        type="number"
        min="0"
        step="0.01"
        value={ingredient.amount}
        onChange={(e) => handleChange(index, "amount", e.target.value)}
        placeholder="Amount"
        className="bg-customYellow py-3 px-4 text-left font-medium"
      />
    </td>
    <td>
      <input
        value={ingredient.unit}
        onChange={(e) => handleChange(index, "unit", e.target.value)}
        placeholder="Unit"
        className="bg-customYellow py-3 px-4 text-left font-medium"
      />
    </td>
    <td>
      <button
        type="button"
        onClick={() => removeIngredient(index)}
        className="flex justify-center"
      >
        <Image 
          src="/bin.png"
          alt="Remove ingredient"
          width={32}
          height={32}
        />
      </button>
    </td>
  </tr>
);

export default IngredientForm;

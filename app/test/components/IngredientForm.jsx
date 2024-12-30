// components/IngredientRow.jsx
const IngredientRow = ({ index, ingredient, handleChange, removeIngredient }) => (
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
        className="bg-red-500 text-white p-2"
      >
        Remove
      </button>
    </td>
  </tr>
);

export default IngredientRow;

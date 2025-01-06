export default function NutritionForm({ nutritions, handleNutritionChange }) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-customDarkGreen">Nutrition</h2>
        <table className="w-full border border-customDarkGreen text-customDarkGreen">
          <thead>
            <tr className="text-left border-b border-customDarkGreen">
              <th className="px-4 py-2">Nutrient Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Unit</th>
            </tr>
          </thead>
          <tbody>
            {nutritions.map((nutrition, index) => (
                <tr className="border-b border-customDarkGreen" key={index}>
                  <td className="px-4 py-2">{nutrition.name}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={nutrition.amount}
                      onChange={(e) =>
                        handleNutritionChange(index, "amount", e.target.value)
                      }
                      placeholder="Amount"
                      className="bg-customYellow text-left font-medium px-4 py-2"
                    />
                  </td>
                  <td className="px-4 py-2"> {nutrition.unit}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  
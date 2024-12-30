export default function NutritionForm({ nutritions, handleNutritionChange }) {
    return (
      <div>
        <h2 className="text-lg font-bold mt-4">Nutrition</h2>
        <table className="w-full table-auto mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nutrient Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Unit</th>
            </tr>
          </thead>
          <tbody>
          {nutritions.map((nutrition, index) => (
              <tr key={index}>
                <td>{nutrition.name}</td>
                <td>
                  <input
                    value={nutrition.amount}
                    onChange={(e) =>
                      handleNutritionChange(index, "amount", e.target.value)
                    }
                    placeholder="Amount"
                    className="border p-2 w-full"
                  />
                </td>
                <td> {nutrition.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
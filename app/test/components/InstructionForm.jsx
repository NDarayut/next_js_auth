// components/Instructions.jsx
const Instructions = ({ instructions, handleChange, addStep, removeStep }) => (
    <div>
      <h2 className="text-lg font-bold mt-4">Instructions</h2>
      {instructions.map((instruction, index) => (
        <div key={index} className="mb-2">
          <textarea
            value={instruction}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Step ${index + 1}`}
            className="border p-2 w-full"
          />
          {instructions.length > 1 && (
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="bg-red-500 text-white p-2 mt-2"
            >
              Remove Step
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="bg-blue-500 text-white p-2"
      >
        Add Step
      </button>
    </div>
  );
  
  export default Instructions;
  
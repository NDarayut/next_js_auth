// components/Instructions.jsx
const Instructions = ({ instructions, handleChange, addStep, removeStep }) => (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-customDarkGreen">Instructions</h2>
      {instructions.map((instruction, index) => (
        <div key={index} className="mb-2 flex items-center border border-customDarkGreen">
          <textarea
            value={instruction}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Step ${index + 1}`}
            className="p-2 w-full bg-customYellow"
          />
          {instructions.length > 1 && (
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="flex justify-center "
            >
              <img src="/bin.png" className="w-8 h-8 m-3" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="flex justify-center items-center"
      >
        <img src="/add.png" className="w-6 h-6 m-3"/><p>Add steps</p>
      </button>
    </div>
  );
  
  export default Instructions;
  
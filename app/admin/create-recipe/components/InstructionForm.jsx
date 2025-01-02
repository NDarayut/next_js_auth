import Image from "next/image";

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
              <Image 
                src="/bin.png"
                alt="Remove instruction"
                width={32}
                height={32}
              />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="flex justify-center items-center"
      >
        <Image
          src="/add.png"
          alt="Add instruction"
          width={24}
          height={24}
          className="m-3"
        />
      </button>
    </div>
  );
  
export default Instructions;
  
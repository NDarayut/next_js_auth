export default function CheckboxGroup({ label, options, selectedOptions, handleChange }){

  return(
    <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-bold mt-4">{label}</h2>
      <div className="space-x-2">
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};
  
  
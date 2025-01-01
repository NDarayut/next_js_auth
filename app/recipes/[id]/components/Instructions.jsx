export default function Instructions({instruction}) {
    return <div className="mt-8">
      <h1 className="font-[700] font-serif text-[25px]">Instructions</h1>
      {instruction.map((instruction, index) => (
        <div key={index} className="mt-4">
          <ol>
            {instruction.steps.map((step) => (
              <li key={step.number} className="flex items-start gap-4 mb-4">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full font-bold">
                    {step.number}
                  </div>
                </div>
                {/* Step Text */}
                <div className="flex-grow">
                  <p className=" text-gray-800 leading-relaxed text-[18px]">{step.step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  }
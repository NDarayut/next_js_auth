export default function FormInputs ({ formData, handleChange, handleImageUpload }) {

    return(
        <>
            <div className="space-y-6">

                {/*Title */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <h1 className="text-lg font-medium text-customDarkGreen">Recipe Title</h1>
                    <div className="md:col-span-2">
                        <input
                            name="title"
                            value={formData.title}
                            required
                            onChange={handleChange}
                            placeholder="Recipe Title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
                        />
                    </div>
                    
                </div>
                
                {/*Image input */}
            
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <h1 className="text-lg font-medium text-customDarkGreen">Upload Image</h1>
                    <div className="md:col-span-2">
                        {formData.image && (
                        <div className="mb-4">
                            <h2 className="text-sm text-gray-600 mb-2">Current Image:</h2>
                            <img
                            src={formData.image}
                            alt="Recipe"
                            className="w-full h-auto max-h-96 object-cover rounded-lg border border-gray-300"
                            />
                        </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
                        />
                    </div>

                    </div>

                

                {/*Description */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                    <h1 className="text-lg font-medium text-customDarkGreen">Description</h1>
                    <div className="md:col-span-2">
                        <textarea
                            rows={6}
                            name="summary"
                            required
                            value={formData.summary}
                            onChange={handleChange}
                            placeholder="Write your recipe description here..."
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen text-gray-600"
                        />
                    </div>
                </div>

                {/*Prep time*/}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <h1 className="text-lg font-medium text-customDarkGreen">Preperation time (mins)</h1>
                    <div className="md:col-span-2">
                        <input
                            type="number"
                            min="1"
                            name="readyInMinutes"
                            required
                            value={formData.readyInMinutes}
                            onChange={handleChange}
                            placeholder="Ready in Minutes"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
                        />
                    </div>
                </div>
            </div>
        </>
    )
};
  
  
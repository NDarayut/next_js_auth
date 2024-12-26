export default function ContactUs() {
    return (
      <div className="relative h-screen flex items-center justify-end bg-customYellow">
        

        {/* Hero Section with Parallax */}
        <div className="relative h-screen w-2/3 bg-center bg-cover" style={{ backgroundImage: "url('/contact_img.jpg')" }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
                    <h1 className="text-white text-5xl md:text-7xl font-bold px-4">
                      Get in Touch with Us!
                    </h1>
                    <p className="text-white text-lg md:text-2xl mt-4 px-8">
                        Whether you have a question, need help, or just want to say hello, we’re here for you.
                    </p>
                </div>
        </div>
  
        {/* Contact Form */}
        <div className="relative w-[500px] bg-customYellow p-8 z-10 mr-16">
          <h1 className="text-4xl font-bold text-center text-customDarkGreen mb-6">
            Contact now
          </h1>
          <form className="flex justify-center flex-col">
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
                placeholder="Name"
                required
              />
            </div>
  
            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
                placeholder="Email"
                required
              />
            </div>
  
            {/* Subject Field */}
            <div className="mb-4">
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
                placeholder="Subject"
                required
              />
            </div>
  
            {/* Message Field */}
            <div className="mb-4">
              <textarea
                id="message"
                name="message"
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
                rows="5"
                placeholder="Write your message here"
                required
              ></textarea>
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="generalButton text-white w-36 font-bold text-lg"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
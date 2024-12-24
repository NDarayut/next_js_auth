export default function ContactUs() {
    return (
      <div className="relative h-screen flex items-center justify-end bg-customYellow">
        {/* Background Image */}
        <div className="absolute inset-0 w-2/3 h-full">
          <img
            src="/contact_img.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Contact Form */}
        <div className="relative w-[500px] bg-customYellow p-8 z-10 mr-16">
          <h1 className="text-4xl font-bold text-center text-customDarkGreen mb-6 font-jura">
            Get In Touch
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
  
"use client";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useState, useEffect } from "react";

export default function ContactUs() {

  // Initialize EmailJS with the public key
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_API_KEY); // Replace with your Public API Key
  }, []);

  const [formData, setFormData] = useState({
    from_name: "",
    to_name: "Bites's Staff",
    reply_to: "", 
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the email using EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID,  // Replace with your service ID
        process.env.NEXT_PUBLIC_TEMPLATE_ID,  // Replace with your template ID
        formData,            // Pass the form data here
        process.env.NEXT_PUBLIC_EMAILJS_API_KEY       // Replace with your user ID
      );
      setStatus("Email sent successfully!");
      setFormData({ from_name: "", to_name: "Bites's Staff", reply_to: "", subject: "", message: "" }); // Clear the form
    } 
    
    catch (error) {
      setStatus("Failed to send email. Please try again later.");
      console.error("EmailJS error: ", error);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-end bg-customYellow">
      {/* Hero Section with Parallax */}
      <div
        className="relative h-screen w-2/3 bg-center bg-cover"
        style={{ backgroundImage: "url('/contact_img.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
          {/* Animated Heading */}
          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch with Us!
          </motion.h1>
          {/* Animated Paragraph */}
          <motion.p
            className="text-white text-lg md:text-2xl mt-4 px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Whether you have a question, need help, or just want to say hello, we&apos;re here for you.
          </motion.p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="relative w-[500px] bg-customYellow p-8 z-10 mr-16">
        <h1 className="text-4xl font-bold text-center text-customDarkGreen mb-6">
          Contact now
        </h1>

        {/* Display status message */}
        {status && (
          <div className="text-center text-xl mb-4">
            <p className={status.includes("success") ? "text-green-500" : "text-red-500"}>{status}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex justify-center flex-col">
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              id="from_name"
              name="from_name"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Your Name"
              value={formData.from_name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              id="reply_to"
              name="reply_to"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Your Email"
              value={formData.reply_to}
              onChange={handleInputChange}
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
              value={formData.subject}
              onChange={handleInputChange}
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
              value={formData.message}
              onChange={handleInputChange}
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

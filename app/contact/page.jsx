"use client"
import ContactUs from "@/components/ContactUsForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="bg-customYellow min-h-screen">
      {/* Navbar with animation */}
        <Navbar />


      {/* Contact Form with animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}  // Start hidden and offset from the bottom
        animate={{ opacity: 1, y: 0 }}    // Animate to visible and no offset
        transition={{ duration: 0.8 }}    // Duration of animation
      >
        <ContactUs />
      </motion.div>

      {/* Footer with animation */}
        <Footer />
    </div>
  );
}

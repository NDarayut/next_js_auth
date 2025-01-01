"use client"
import ContactUs from "@/app/contact/components/ContactUsForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <div className="bg-customYellow min-h-screen">
        <Navbar />
        <ContactUs />
        <Footer />
    </div>
  );
}

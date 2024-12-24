"use client"
import ContactUs from "@/components/ContactUsForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Contact(){
    return(
        <div className="bg-customYellow min-h-screen">
          
            <div className="sticky top-0 bg-customYellow z-50">
                    <Navbar />
            </div>
    
            <ContactUs/>
            <Footer/>
      </div>
    )
}
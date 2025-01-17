import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-customBrown text-customDarkGreen py-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-44 justify-center">

          <div className="text-center md:text-left text-[50px] font-bold font-kodchasan text-customDarkBrown">
            <p>My Kitchen</p>
            <p>My-Rules</p>
          </div>

          <div className="flex gap-44 font-jura">
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <h1 className="mb-1 text-customDarkBrown font-bold text-[24px]">Resources</h1>
              <Link href="/" className="hover:text-green-500 font-bold text-[16px]">Home</Link>
              <Link href="/about" className="hover:text-green-500 font-bold text-[16px]">About us</Link>
            </div>
            
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <h1 className="mb-1 text-customDarkBrown font-bold text-[24px]">More About Us</h1>
              <Link href="/contact" className="hover:text-green-500 font-bold text-[16px]">Contact us</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";

export default function Introduction({title, author, description, recipeImage}) {
    return <div>
      
      <h1 className="font-serif text-[60px] mb-4 text-customDarkGreen max-w-[1000px]">{title}</h1>
      <h1 className="font-normal font-sans text-[18px] mb-4">Created by: {author}</h1>
      <div className="border-b-1 border-customDarkGreen" />
      <section className="flex flex-col items-center justify-center gap-6 mt-[50px]">
        <p
          className="text-[18px] align-left mb-[50px]"
          dangerouslySetInnerHTML={{ __html: description }} />
        <Image 
          src={recipeImage}
          alt="Recipe Image"
          width={0}
          height={0}
          className="rounded-small w-[900px] h-auto mb-4"
        />
      </section>
    </div>
  }
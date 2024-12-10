"use client"

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {Image} from "@nextui-org/react";

export default function CustomCarousel() {

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='embla flex flex-row'>

      <div className='flex'>
        <button className="embla__prev" onClick={scrollPrev}>
          <img src='/left.png' className='w-2/3 h-auto'/>
        </button>
      </div>
      
      <div className="embla__viewport h-[400px]" ref={emblaRef}>

          <div className="embla__container h-full">

            <div className="embla__slide flex">
              {/*Cuisine image*/}
              <div className=''><Image src="/japanese.jpg" className='w-[1000px]  h-[400px] object-cover rounded-none'/></div>

              <div className='flex flex-col px-9 w-[1500px]'>
                <h1 className='text-[50px] font-bold text-customDarkGreen font-serif'>Japanese cuisine</h1>
                <h1 className='text-[30px] font-semibold text-customDarkGreen font-sans'>Curry chicken rice</h1>

                 {/*Timer and task image*/}
                <div className='flex flex-row items-center mt-3'>
                  <div className='flex mr-16 items-center'>
                    <Image src="/timer.png" className="w-[20px] h-[20px] mr-3" />    
                    <h1 className='font-sans text-customDarkGreen text-[16px] font-semibold'>10 min</h1>
                  </div>

                  <div className='flex items-center'>
                    <Image src="/task.png" className="w-[20px] h-auto mr-3 rounded-none" />    
                    <h1 className='font-sans text-customDarkGreen text-[16px] font-semibold'>Easy</h1>
                  </div>
                </div>

                {/*Description*/}
                <div className='flex flex-col mt-8'>
                  <p className='text-[18px] font-sans text-customDarkGreen text-justify font-medium'>Japanese curry is characterized by its mild, slightly sweet flavor and thick,
                    gravy-like texture, setting it apart from traditional indian curry or southeast asian curries, which are
                      usually spicier, less sweet, and thinner in consistency.
                  </p>

                  <hr className='border-customGreen border-[2px] mt-7'/>
                </div>
                
              </div>
              
            </div>

            <div className="embla__slide flex">
              {/*Cuisine image*/}
              <div className=''><Image src="/italian.jpg" className='w-[1000px]  h-[400px] object-cover rounded-none'/></div>

              <div className='flex flex-col px-9 w-[1500px]'>
                <h1 className='text-[50px] font-bold text-customDarkGreen font-serif'>Italian cuisine</h1>
                <h1 className='text-[30px] font-semibold text-customDarkGreen font-sans'>Carbonara pasta</h1>

                 {/*Timer and task image*/}
                <div className='flex flex-row items-center mt-3'>
                  <div className='flex mr-16 items-center'>
                    <Image src="/timer.png" className="w-[20px] h-[20px] mr-3" />    
                    <h1 className='font-sans text-customDarkGreen text-[16px] font-semibold'>20 min</h1>
                  </div>

                  <div className='flex items-center'>
                    <Image src="/task.png" className="w-[20px] h-auto mr-3 rounded-none" />    
                    <h1 className='font-sans text-customDarkGreen text-[16px] font-semibold'>Easy</h1>
                  </div>
                </div>

                {/*Description*/}
                <div className='flex flex-col mt-8'>
                  <p className='text-[18px] font-sans text-customDarkGreen text-justify font-medium'>
                    Italian pasta, a global culinary icon, is celebrated for its simplicity and versatility. With diverse shapes 
                    and regional sauces like creamy Alfredo or Naples’ ragù, it embodies Italy’s rich food traditions 
                    and love for bringing people together.
                  </p>

                  <hr className='border-customGreen border-[2px] mt-7'/>
                </div>
                
              </div>
              
            </div>

            <div className="embla__slide flex">
              {/*Cuisine image*/}
              <div className=''><Image src="/chinese.jpg" className='w-[1000px]  h-[400px] object-cover rounded-none'/></div>

              <div className='flex flex-col px-9 w-[1500px]'>
                <h1 className='text-[50px] font-bold text-customDarkGreen font-serif'>Chinese cuisine</h1>
                <h1 className='text-[30px] font-semibold text-customDarkGreen font-sans'>Longevity noodle</h1>

                 {/*Timer and task image*/}
                <div className='flex flex-row items-center mt-3'>
                  <div className='flex mr-16 items-center'>
                    <Image src="/timer.png" className="w-[20px] h-[20px] mr-3" />    
                    <h1 className='font-sans text-customDarkGreen text-[16px] font-semibold'>15 min</h1>
                  </div>

                  <div className='flex items-center'>
                    <Image src="/task.png" className="w-[20px] h-auto mr-3 rounded-none" />    
                    <h1 className='font-sans text-customDarkGreen text-[16px] font-semibold'>Easy</h1>
                  </div>
                </div>

                {/*Description*/}
                <div className='flex flex-col mt-8'>
                  <p className='text-[18px] font-sans text-customDarkGreen text-justify font-medium'>
                   Chinese noodles, a staple of Chinese cuisine, come in various forms like wheat, rice, or egg-based. They are often 
                   stir-fried, served in soups, or tossed with flavorful sauces, reflecting China's rich culinary diversity and 
                   regional flavors.
                  </p>

                  <hr className='border-customGreen border-[2px] mt-7'/>
                </div>
                
              </div>
              
            </div>

          </div>
      </div>
      
      <div className='flex'>
        <button className="embla__next" onClick={scrollNext}>
          <img src='/right.png' className='w-2/3 h-auto' />
        </button>
      </div>

      
    </div>
    
  )
}

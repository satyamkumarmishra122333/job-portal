import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
const category = ["Frontend Developer",
    "Backend Developer ",
    "Data Science ",
    "Graphic Designer",
    "Mern Stack Developer",
    "Full Stack Developer"
]
function CategoryCarousel() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchJobHandler = (query)=>{
            dispatch(setSearchedQuery(query));
            navigate('/browse')
        }
    return (
        <div className='px-4'>
            <Carousel className='mx-auto my-20 w-full max-w-5xl'>

                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={`${cat}-${index}`} className='basis-full sm:basis-1/2 lg:basis-1/3'>
                                <Button onClick ={()=>searchJobHandler(cat)} variant="outline" className='w-full rounded-full border border-green-400 px-4 py-2 text-sm sm:text-base'>{cat}</Button>
                            </CarouselItem>

                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel

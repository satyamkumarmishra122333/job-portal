import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
    const [query , setQuery]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = ()=>{
        dispatch(setSearchedQuery(query));
        navigate('/browse')
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='shadow-[0px_0px_5px_1px_green] px-4 py-2 rounded-full bg-gray-100 font-sans  mx-auto '>Job<span className='text-green-600'>Sphere</span> Your World of Opportunities.</span>

                <h1 className='text-5xl font-bold'>Search, Apply & <br />Get Your <span className='text-green-500'>Dream Job</span></h1>
                <p className='text-sm italic'>JobSphere is a global platform connecting skilled talent with meaningful opportunities across diverse industries and roles.</p>
                <div>
                    <input 
                    type="text"
                    placeholder='Search Job' 
                    onChange={(e)=> setQuery(e.target.value)}
                    className='flex w-[40%] border outline-none border-green-400 pl-3 rounded-full items-center gap-4 mx-auto focus:border-green-600 hover:shadow-[0px_0px_2px_0px_green] transition-all 0.2s ease-in-out' />
                    <Button onClick={searchJobHandler} className='rounded-b-full w-[10%] hover:shadow-[0px_0px_10px_1px_green] transition-all 0.9s ease-in-out'>
                        <Search className=' h-5 w-5'/>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection

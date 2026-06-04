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
        <div className='px-4 text-center'>
            <div className='mx-auto flex max-w-6xl flex-col gap-5 my-10'>
                <span className='mx-auto rounded-full bg-gray-100 px-4 py-2 text-sm shadow-[0px_0px_5px_1px_green] sm:text-base'>Job<span className='text-green-600'>Sphere</span> Your World of Opportunities.</span>

                <h1 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>Search, Apply & <br />Get Your <span className='text-green-500'>Dream Job</span></h1>
                <p className='mx-auto max-w-2xl text-sm italic text-gray-600 sm:text-base'>JobSphere is a global platform connecting skilled talent with meaningful opportunities across diverse industries and roles.</p>
                <div className='mx-auto flex w-full max-w-2xl flex-col gap-3 px-2 sm:flex-row'>
                    <input 
                    type="text"
                    placeholder='Search Job' 
                    onChange={(e)=> setQuery(e.target.value)}
                    className='h-11 flex-1 rounded-full border border-green-400 pl-4 outline-none transition-all duration-200 hover:shadow-[0px_0px_2px_0px_green] focus:border-green-600' />
                    <Button onClick={searchJobHandler} className='h-11 rounded-full bg-green-500 px-6 hover:bg-green-600 hover:shadow-[0px_0px_10px_1px_green]'>
                        <Search className='h-5 w-5'/>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection

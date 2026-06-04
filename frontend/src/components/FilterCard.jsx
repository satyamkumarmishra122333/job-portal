import React, { useEffect, useState } from 'react'
import { RadioGroup } from './ui/radio-group';
import { data } from 'react-router-dom';
import { RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Hyderabad", "Mumbai", "Banglore", "Kolkata", "Delhi NCR", "Chennai", "Pune"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "MERN Stack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42K-1 L", "1L - 3L", "4L-5L"]
    }

];

function FilterCard() {
const [selectedValue , setSelectedValue] =  useState('');
const dispatch = useDispatch();
const changeHandler = (value) =>{
    setSelectedValue(value);
}

useEffect(()=>{
   dispatch(setSearchedQuery(selectedValue));
    
}, [selectedValue])

    return (
        <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
            <h1 className='text-lg font-semibold'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup  value={selectedValue} onValueChange= {changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg text-green-500'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index} - ${idx}`
                                    return (<div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId} >{item}</Label>
                                    </div>)
                                })
                            }
                        </div>
                    ))




                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard

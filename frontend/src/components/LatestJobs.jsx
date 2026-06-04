import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs=()=> {
    const {allJobs}= useSelector(store =>store.job);

    return (
        <div className='mx-auto my-20 max-w-7xl px-4'>
            <h1 className='text-3xl font-bold font-sans sm:text-4xl'><span className='text-green-500'> Latest </span>
                Job Openings
            </h1>
            <div className='my-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>

                {
                   allJobs.length <=0 ?<span> Job Not Found</span>: allJobs?.slice(0,6).map((job) => <LatestJobCards  key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs

import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';

import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './utils/constant';
import api from './utils/axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useState } from 'react';

function JobDescription() {
  
  const params = useParams();
  const jobId = params.id;
  const {singleJob}= useSelector(store=>store.job);
  const dispatch = useDispatch();  
  const {user} = useSelector (store=>store.auth)
  

  const isIntiallyApplied = singleJob?.applications?.some(application=>application.applicant ===user?._id) || false;
  const [isApplied,setIsApplied]= useState(isIntiallyApplied)


const applyJobHandler= async ()=>{
  try {
    const res = await api.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`);
    console.log(res.data);
    
    if(res.data.success){
      setIsApplied(true); //update the local state
      const updatedSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
      dispatch(setSingleJob(updatedSingleJob)) //help us to real time update the ui
      toast.success(res.data.message);

    }
  } catch ( error) {
    console.log(error);
    toast.error(error.response.data);
  }
}
  useEffect(() => {
    const fetchSingleJob = async () => {
        try {
          const res = await api.get(`${JOB_API_END_POINT}/get/${jobId}`);

            if(res.data.success){
                dispatch(setSingleJob(res.data.job));
                setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) //ensure the state is in sync with fresh data
            }
        } catch (error) {
            console.log(error);

        }
    }
    fetchSingleJob();
}, [jobId ,dispatch ,user?._id]);




  
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4 flex-wrap'>
            <Badge className={'text-green-500 font-bold '} variant="ghost">{singleJob?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
          </div>

        </div>

        <Button
        onClick={isApplied? null :applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}>{isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>
      <h1 className='border-b-2 border-b-green-500 font-medium py-4'>
        Job Description
      </h1>
      <div className='my-4 '>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Post Date <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>

      </div>
    </div>
  )
}

export default JobDescription

import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { AvatarImage } from './ui/avatar'
import { Avatar } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "ddsfsffs";
    const daysAgoFunction=(mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference =  currentTime-createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));

    }
    return (
        <div className='m-[5px] 5 p-5 rounded-md shadow-xl bg-white botder border border-green-500 hover:shadow-[0px_0px_10px_0px_green] transition-all ease-in-out'>
            <div className='flex items-center justify-between '>

                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)==0? "Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant='outline' className='rounded-full ' size='icon' ><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2 '>

                <Button className='bg-transparent'>
                    <Avatar className=''>
                        <AvatarImage src={job?.company?.logo} className='w-[3vw]'

                        />
                        {/* 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg' */}
                    </Avatar>
                </Button>

                <div>
                    <h1 className='font-sans font-medium text-lg '>{job?.company?.name}</h1>
                    <p className='text-gray-500'> India</p>

                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'text-green-500 font-bold '} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4 flex-wrap'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
                <Button className='bg-green-500'>Save For Later</Button>
            </div>
        </div>
    )
}

export default Job

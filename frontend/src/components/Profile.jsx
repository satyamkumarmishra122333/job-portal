import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


// const skills = ["Html", "CSS", "JavaScript", "MySQL", "React-Js", "MongoDB"]
const isResume = true;
function Profile() {
    useGetAppliedJobs();
    const [open , setOpen]= React.useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-green-400 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gsp-4'>
                        <Avatar className='h-24 w-24 '>
                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt='profile photo' />


                        </Avatar>
                        <div>
                            <h1>{user?.fullname }</h1>
                            <p>{user?.profile?.bio}</p>

                        </div>

                    </div>
                    <Button className='text-right ' variant='outline' onClick={()=>setOpen(true)}><Pen /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>

                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>

                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='font-bold text-green-600 underline'>
                        Skills
                    </h1>
                    <div className='flex gap-1 items-center  '>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge className='border border-green-500 ' key={item}>{item}</Badge>) : <span>No Skills Found</span>
                        }
                    </div>


                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label>Résumé</Label>

                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-green-500 w-full hover:underline cursor-pointer '>{user.profile.resumeOriginalName} </a> : <span>No resume found</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-gray-200 rounded-2xl'>
                <h1 className=' text-green-600 underline font-bold text-lg my-5'>Applied Job</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile

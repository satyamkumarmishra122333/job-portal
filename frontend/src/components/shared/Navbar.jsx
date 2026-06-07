import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { Button } from '../ui/button.jsx'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import api from '../utils/axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            const res = await api.get(`${USER_API_END_POINT}/logout`)
            if (res.data.success) {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                dispatch(setUser(null))
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-white border-b border-gray-100'>
            <div className='mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between'>
                <div>
                    <h1 className='text-xl font-bold font-sans sm:text-2xl'>Job<span className='text-green-500'>Sphere</span></h1>
                </div>
                <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-8'>
                    <ul className='flex flex-wrap items-center gap-2 text-sm sm:gap-3 md:gap-5 md:text-base'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-green-500 cursor-pointer'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-green-500 cursor-pointer'><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-green-500 cursor-pointer'><Link to="/">Home</Link></li>
                                    <li className='hover:text-green-500 cursor-pointer'><Link to='/jobs'>Jobs</Link></li>
                                    <li className='hover:text-green-500 cursor-pointer' ><Link to='/browse'>Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex flex-wrap items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-green-500 hover:bg-green-600" >Signup</Button>
                                </Link>

                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>


                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium '>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link" ><Link to="/profile"> View Profile</Link>

                                                        </Button>

                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" >
                                                    Logout
                                                </Button>
                                            </div>

                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>


        </div>
    )
}

export default Navbar

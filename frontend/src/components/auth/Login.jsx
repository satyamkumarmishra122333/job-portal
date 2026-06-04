import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader } from 'lucide-react'
import store from '@/redux/store'

function Login() {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",

    });
    const {loading} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
       
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`,input , {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if(res.data.success){
                dispatch (setUser(res.data.user))
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.success(error.response.data.message);
            
        }finally{
            dispatch(setLoading(false));
        }
    }




    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 underline shadow-[2px_2px_2px_green]'>Login</h1>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" placeholder="Satyamkumar@gmail.com" value={input.email} name="email" onChange={changeEventHandler} />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} />
                    </div>
                    <div className='flex items-center justify-between'>

                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2   ">
                                <Input

                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler} className="cursor-pointer  " />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>



                    </div>
                    {
                       loading?<Button className="w-full my-4 bg-green-400" ><Loader className='mr-2 h-4 w-4 animate-spin'/>Please Wait...</Button>: <Button type="submit" className="w-full my-4 bg-green-400 hover:bg-green-500 hover:shadow-[0px_0px_5px_black]  transition-all duration-1s ease-in-out">Login</Button>
                    }
                   

                    <span>New User? <Link to="/signup" className="text-m m-1 text-green-700 ">Signup</Link ></span>
                </form>
            </div>
        </div>
    )
}

export default Login

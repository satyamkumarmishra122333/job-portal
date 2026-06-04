import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../utils/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { Loader } from 'lucide-react';

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const res = await api.post("/api/v1/user/login", input);

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form
                    onSubmit={submitHandler}
                    className='my-10 w-full max-w-xl rounded-md border border-gray-200 p-4 md:w-1/2'
                >
                    <h1 className='font-bold text-xl mb-5 underline shadow-[2px_2px_2px_green]'>
                        Login
                    </h1>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                <Label>Student</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        isSubmitting ? (
                            <Button className="w-full my-4 bg-green-400" disabled>
                                <Loader className='mr-2 h-4 w-4 animate-spin' />
                                Please Wait...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full my-4 bg-green-400 hover:bg-green-500"
                            >
                                Login
                            </Button>
                        )
                    }

                    <span>
                        New User?{" "}
                        <Link to="/signup" className="text-green-700">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
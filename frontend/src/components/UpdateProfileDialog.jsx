import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import api from './utils/axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';


function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = React.useState(false);
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = React.useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: Array.isArray(user?.profile?.skills) ? user.profile.skills.join(', ') : "",
        file: null,
    });
    const dispatch = useDispatch();
    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname || "");
        formData.append("email", input.email || "");
        formData.append("phoneNumber", input.phoneNumber || "");
        formData.append("bio", input.bio || "");
        formData.append("skills", typeof input.skills === 'string' ? input.skills : (input.skills || []).join(', '));

        if (input.file instanceof File) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true)
            const res = await api.post("/api/v1/user/profile/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Profile update failed");
            
        } finally{
            setLoading(false)
        }
        setOpen(false);
        console.log(input);


    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='sm: max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>
                            Update Profile
                        </DialogTitle>
                        <form onSubmit={submitHandler}>
                            <div className='grid py-4 gap-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-right'>Name</Label>
                                    <input
                                        id='name'
                                        name='fullname'
                                        value={input.fullname}
                                        type='text'
                                        onChange={changeEventHandler}
                                        className='col-span-3 outline-green-500 border border-gray-700 rounded-sm'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='email'
                                        className='text-right'>Email</Label>
                                    <input
                                        id='email'
                                        type='email'
                                        name='email'
                                        onChange={changeEventHandler}
                                        value={input.email}
                                        className='col-span-3 outline-green-500  border border-gray-700 rounded-sm'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='email'
                                        className='text-right'>Phone Number</Label>
                                    <input
                                        id='number'
                                        type='number'
                                        name='phoneNumber'
                                        onChange={changeEventHandler}
                                        value={input.phoneNumber}
                                        className='col-span-3 outline-green-500  border border-gray-700 rounded-sm'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='bio' className='text-right'>Bio</Label>
                                    <input
                                        id='bio'
                                        type='text'
                                        name='bio'
                                        onChange={changeEventHandler}
                                        value={input.bio}
                                        className='col-span-3 outline-green-500  border border-gray-700 rounded-sm'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='skills' className='text-right'>Skills</Label>
                                    <input
                                        id='skills'
                                        name='skills'
                                        onChange={changeEventHandler}
                                        value={input.skills}
                                        className='col-span-3 outline-green-500  border border-gray-700 rounded-sm'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='file' className='text-right'>Resume / Photo</Label>
                                    <input
                                        id='file'
                                        name='file'
                                        type='file'
                                        onChange={fileChangeHandler}
                                        accept='application/pdf,image/*'
                                        className='col-span-3 outline-green-500  border border-gray-700 rounded-sm bg-green-300'
                                    />
                                </div>

                            </div>
                            <DialogFooter>
                                {

                                    loading ? <Button className="w-full my-4 bg-green-400" ><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait...</Button> : <Button type="submit" className="w-full my-4 bg-green-400 hover:bg-green-500 hover:shadow-[0px_0px_5px_black]  transition-all duration-1s ease-in-out">Update</Button>

                                }
                            </DialogFooter>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog

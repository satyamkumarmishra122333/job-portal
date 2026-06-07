import { COMPANY_API_END_POINT } from '@/components/utils/constant';
import { setCompanies } from '@/redux/companySlice';
import api from '@/components/utils/axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllCompanies() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await api.get(`${COMPANY_API_END_POINT}/get`);
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchCompanies();
    }, [])
}

export default useGetAllCompanies

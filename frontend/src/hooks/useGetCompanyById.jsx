import { COMPANY_API_END_POINT } from '@/components/utils/constant';
import { setSingleCompany } from '@/redux/companySlice';
import api from '@/components/utils/axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetCompanyById(companyId) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await api.get(`${COMPANY_API_END_POINT}/get/${companyId}`);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById

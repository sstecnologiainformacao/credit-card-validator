import { useMutation } from 'react-query';
import axios from 'axios';

interface IPostResponse {
    status: number;
    data: {
        result: boolean;
    };
};

const fetchValidation = async (cardNumber: string | null) => {
    
    if (!cardNumber) {
        return;
    }
    try {
        const validation: IPostResponse = await axios.post('http://localhost:3001/creditcard', {
            cardNumber,
        });
        if (validation.status !== 200) {
            return false;
        }
        console.log(validation.data.result || false);
        return validation.data.result || false;
    } catch (error: unknown) {
        console.log(error);
        return false;
    }
};

const useValidation = () => {
  return useMutation(fetchValidation);
};

export default useValidation;

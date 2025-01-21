import { useQuery } from 'react-query';
import axios from 'axios';

export interface INumberPatternData {
    code: string;
    name: string;
    size: number;
    format: Array<number>;
    textFormatted: (valud: string) => string;
};

interface INumberPattern {
    status: number;
    data: {
        result: Array<INumberPatternData>;
    };
};

const fetchPatterns = async () => {
    try {
        const patterns: INumberPattern = await axios.get('http://localhost:3001/creditcard/patterns');
        if (patterns.status !== 200) {
            return [];
        }
        return patterns.data.result || [];
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
};

// Hook personalizado para buscar usuários
const usePatterns = () => {
  return useQuery('patterns', fetchPatterns);
};

export default usePatterns;

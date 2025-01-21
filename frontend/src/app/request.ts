import axios from "axios";

interface IPostResponse {
    status: number;
    data: {
        result: boolean;
    };
};

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

export const validate = async (cardNumber: string): Promise<boolean> => {
    try {
        const validation: IPostResponse = await axios.post('http://localhost:3001/creditcard', {
            cardNumber,
        });
        if (validation.status !== 200) {
            return false;
        }
        return validation.data.result || false;
    } catch (error: unknown) {
        console.log(error);
        return false;
    }
}

export const getPatterns = async (): Promise<Array<INumberPatternData> | []> => {
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
}
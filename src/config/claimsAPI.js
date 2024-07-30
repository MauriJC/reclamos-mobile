import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



const urlApi = 'http://192.168.101.2:3001';

export const claimsApi = axios.create({
    baseURL: urlApi,
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':  '*',
    }
});

/*
 claimsApi.interceptors.request.use(

    async(config) => {
        const token = await AsyncStorage.getItem('e-token');
        if(token){
            config.headers['x-token-data'] = token;
        }

        return config;
    }
)

*/
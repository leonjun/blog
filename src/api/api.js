import axios from 'axios';
export const fwblist = params => {
    return axios.post('/api/user/queryUditor', params).then(res => res); 
};
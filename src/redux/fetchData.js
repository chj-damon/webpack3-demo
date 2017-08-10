import axios from 'axios';

const JSONInstance = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
    transformResponse: [(resp) => {
        const response = JSON.parse(resp);
        return response;
    }]
});

export function get(url) {
    return JSONInstance.get(url);
}
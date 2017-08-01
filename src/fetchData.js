import axios from 'axios';

const JSONInstance = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
    transformResponse: [(resp) => {
        const response = JSON.parse(resp);
        response.code = resp.success ? 200 : resp.code;
        return response;
    }]
});

export default function get(url) {
    return JSONInstance.get(url);
}
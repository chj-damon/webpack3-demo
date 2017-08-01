import get from '../src/fetchData';

const fetchJSON = async () => {
    try {
        const url = 'http://121.43.184.1:5000/mockjsdata/1/rule/fetchRuleScene';
        const response = await get(url);
        return response.data;
    } catch (e) {
        throw new Error('error');
    }
};
export default fetchJSON;
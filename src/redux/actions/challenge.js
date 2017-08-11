import { get } from '../fetchData';
import { mockServer } from '../config';

export const getChallenges = () => async (dispatch) => {
    try {
        const url = `${mockServer}/challenges`;
        const response = await get(url);
        if (response.data.success) {
            dispatch({
                type: 'GET_CHALLENGES',
                payload: response.data.data
            });
        }
    } catch (err) {
        console.log(err);
    }
};
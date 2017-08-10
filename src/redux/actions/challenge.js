import { get } from '../fetchData';
import { backendServer } from '../config';

export const getChallenges = () => async (dispatch) => {
    try {
        const url = `${backendServer}/challenges`;
        const response = await get(url);
        if (response.data.success) {
            dispatch({
                type: 'GET_CHALLENGES',
                payload: response.data.challenges
            });
        }
    } catch (err) {
        console.log(err);
    }
};
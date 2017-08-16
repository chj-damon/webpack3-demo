import { get } from '../fetchData';
import { mockServer } from '../config';

export const fetchRoomList = () => async (dispatch) => {
    try {
        const url = `${mockServer}/rooms`;
        const response = await get(url);
        if (response.data.success) {
            dispatch({
                type: 'FETCH_ROOM',
                payload: response.data.data
            });
        }
    } catch (err) {
        console.log(err);
    }
};
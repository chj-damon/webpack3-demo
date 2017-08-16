const initialState = {
    rooms: []
};
export default function rooms(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ROOM':
            return {
                ...state,
                rooms: action.payload
            }; 

        default: 
            return state;
    }
}
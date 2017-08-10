const initialState = {
    challenges: []
};
export default function challenges(state = initialState, action) {
    switch (action.type) {
        case 'GET_CHALLENGES':
            return {
                ...state,
                challenges: action.payload
            }; 

        default: 
            return state;
    }
}
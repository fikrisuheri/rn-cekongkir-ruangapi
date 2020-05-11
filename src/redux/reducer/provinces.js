const initialState = {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    provinces: []
}

const Provinces = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROVINCES_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            }
        case 'GET_PROVINCES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_PROVINCES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                provinces: action.payload.data.data.results
            }
        default:
            return state;
    }
}

export default Provinces ;
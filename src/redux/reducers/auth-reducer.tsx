const initialState = {
    isAuth: false,
    user: {
        id: null,
        email: null,
        login: null
    }
}

const authReducer = (state=initialState) => {
    return state;
}

export default authReducer;
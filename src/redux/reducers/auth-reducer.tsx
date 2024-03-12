import { jwtDecode } from "jwt-decode";

interface userDataProps {
    id: string;
    email: string;
    name: string;
}

interface authProps {
    isAuth: boolean;
    user: userDataProps | null;
}

let initialState: authProps = {
    isAuth: false,
    user: null
};

const userData = localStorage.getItem('user');

if (userData) {
    const parsedData = JSON.parse(userData);
    const decodedToken: any = jwtDecode(parsedData);
    const expiresAt = decodedToken && new Date(decodedToken?.exp * 1000);
    if (new Date() > expiresAt) {
        localStorage.removeItem('user');
    } else {
        initialState = {
            isAuth: true,
            user: {
                id: decodedToken?.user_id,
                email: decodedToken?.email,
                name: decodedToken?.name
            }
        };
    }
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // handle actions if needed
        default:
            return state;
    }
};

export default authReducer;

import {createContext, useContext, useState } from 'react';
import {checkToken} from '../services/requests';
import {BASE_URL} from '../constants/Path'

//Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const login = async (user, pass) => {
        console.log(user + pass);

        const credentials = {
            usernae: user,
            password: pass
        }

        try{
            con
        }
    }
}
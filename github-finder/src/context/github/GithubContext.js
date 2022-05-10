import React, { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_API_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
      users: [],
      loading: false
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // const fetchUsers = async () => {
    //     setLoading();
    //     const response = await fetch(`https://api.github.com/users`, {
    //         headers: {
    //             Authorization: `token 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`
    //         }
    //     });
    //     const data = await  response.json();
    //
    //     dispatch({
    //         type: 'GET_USERS',
    //         payload: data,
    //     });
    // };

    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q: text
        });
        const response = await fetch(`https://api.github.com/search/users?${params}`, {
            headers: {
                Authorization: `token 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`
            }
        });
        const {items} = await  response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items,
        });
    };

    const clearUsers = () => dispatch({
        type: 'CLEAR_USERS'
    });

    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    });

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
};

export default GithubContext

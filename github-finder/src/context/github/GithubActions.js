import axios from 'axios';

const GITHUB_URL = process.env.REACT_API_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: `token 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`}
});

export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text,
    });

    // const response = await fetch(`https://api.github.com/search/users?${params}`, {
    //     headers: {
    //         Authorization: `token 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`,
    //     }
    // });

    const response = await github.get(`/search/users?${params}`);
    return response.data;
   // return await response.json();
};

export const getUserRepos = async (login) => {

    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    });

    const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, {
        headers: {
            Authorization: `token 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`
        }
    });
    return await response.json();
};

export const getUser = async (login) => {

    const response = await fetch(`https://api.github.com/users/${login}`, {
        headers: {
            Authorization: `token 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`
        }
    });
    return await response.json();
};

export const getUserAndRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    });

    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos?${params}`)
    ]);

    return {user: user.data, repos: repos.data}
};






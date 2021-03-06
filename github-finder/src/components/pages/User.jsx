import React, {useEffect, useContext} from 'react';
import GithubContext from '../../context/github/GithubContext';
import {useParams, Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import RepoList from '../repos/RepoList';
import {getUser, getUserAndRepos, getUserRepos} from '../../context/github/GithubActions';

function User() {
    const { user, loading, repos, dispatch} = useContext(GithubContext);

    const params = useParams();

    useEffect(() => {
        dispatch({type: 'SET_LOADING'});
        const getUserData = async() => {
            // const userData = await getUser(params.login);
            // dispatch({type: 'GET_USER', payload: userData});
            //
            // const userRepoData = await getUserRepos(params.login);
            // dispatch({type: 'GET_REPOS', payload: userRepoData});

            const userData = await getUserAndRepos(params.login);
            dispatch({type: 'GET_USER_AND_REPOS', payload: userData});
        };
        getUserData();

        // getUser(params.login);
        // getUserRepos(params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params.login]);

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    if (loading) {
        return <Spinner/>
    }

    return (
        <>
            <div className='w-full mx-auto lg:w-10/12'>
                <div className='mb-4'>
                    <Link to='/' className='btn btn-ghost'>Back to Search</Link>
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
                    <div className='custom-card-image mb-6 md:mb-0'>
                        <div className='rounded-lg shadow-xl card image-full'>
                            <figure>
                                <img
                                    src={avatar_url}
                                    className='round-img'
                                    alt=''
                                    style={{ width: '150px' }}
                                />
                            </figure>
                            <div className='card-body justify-end'>
                                <h2 className='card-title mb-0'>
                                    name
                                </h2>
                                <p>{login}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-2'>
                        <div className='mb-6'>
                            <h1 className='text-3xl card-title'>
                                <div className='ml-2 mr-1 badge badge-success'>
                                    {user.type}
                                </div>

                            </h1>
                            <p>{bio}</p>
                            <div className='mt-4 card-actions'>
                                <a href={"/"} target='_blank' rel='noreferrer' className='btn btn-outline'>visit github profile</a>
                            </div>
                        </div>

                        <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
                            {location}
                        </div>
                    </div>

                </div>
                <RepoList repos={repos}/>

            </div>
        </>
    )
}

export default User

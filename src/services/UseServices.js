import baseURL from './CutomizeAxios';

function fetchUser(url) {
    return baseURL.get(url);
}

function fetchDelete(url) {
    return baseURL.delete(url);
}

export { fetchUser, fetchDelete };

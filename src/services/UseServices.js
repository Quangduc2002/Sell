import baseURL from './CutomizeAxios';

function fetchUser(url) {
    return baseURL.get(url);
}

function fetchDelete(url) {
    return baseURL.delete(url);
}

function axiosPut(url, action) {
    return baseURL.put(url, action);
}

function axiosPost(url, action) {
    return baseURL.post(url, action);
}

export { fetchUser, fetchDelete, axiosPut, axiosPost };

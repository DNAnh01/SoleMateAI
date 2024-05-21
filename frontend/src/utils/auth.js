export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLocalStorage = (accessToken) => {
    localStorage.setItem('access_token', accessToken);
};

export const getAccessTokenFromLocalStorage = () => {
    return localStorage.getItem('access_token');
};

export const setProfileToLocalStorage = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile));
};

export const getProfileFromLocalStorage = () => {
    const result = localStorage.getItem('profile');
    return result ? JSON.parse(result) : null;
};

export const clearLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    const clearLocalStorageEvent = new Event('clearLocalStorage');
    LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent);
};

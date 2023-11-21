import axios from 'axios'
export const AuthApi = (instance) => ({
    async register(data) {
        try {
            const url = '/api/users';
            const form = {
                "username": data.name,
                "alias": data.name,
                "title": "Software Engineer",
                "accountNumber": data.name,
                "email": data.email,
                "language": "en_US",
                "timezone": "Europe/Bucharest",
                "roles": [
                    "ROLE_TEAMLEAD"
                ],
                "plainPassword": data.password,
                "plainApiToken": data.password,
                "enabled": true,
                "systemAccount": true
            }
            const options = {
                baseURL: import.meta.env.VITE_APP_CLOUD_API,
                headers: {
                    'X-AUTH-USER': import.meta.env.VITE_AUTH_USER,
                    'X-AUTH-TOKEN': import.meta.env.VITE_AUTH_TOKEN,
                },
            }

            const response = await axios.post(url, form, options);
            return response;
        } catch (error) {
            console.error('Register request failed:', error);
            throw error;
        }
    },
    async login(data) {
        try {
            const url = '/api/users/me';
            const options = {
                baseURL: import.meta.env.VITE_APP_CLOUD_API,
                headers: {
                    'X-AUTH-USER': data.email,
                    'X-AUTH-TOKEN': data.password,
                },
            }

            const response = await axios.get(url, options);
            return response;
        } catch (error) {
            console.error('Login:', error);
            throw error;
        }
    },
    async getUser(data) {
        try {
            const url = '/api/users/me';
            const response = instance.get(url);
            return response;
        } catch(error) {
            console.error('Get user', error)
            throw error;
        }
    }
});

export const TimesheetsApi = (instance) => ({
    async getAll() {
        try {
            const url = '/api/timesheets';
            const response = instance.get(url);
            return response;
        } catch(error) {
            console.error('Get user', error)
            throw error;
        }
    },
    async create(data){
        try {
            const url = '/api/timesheets';
            const response = instance.post(url, data);
            return response;
        } catch(error) {
            console.error('Get user', error)
            throw error;
        }
    }
});

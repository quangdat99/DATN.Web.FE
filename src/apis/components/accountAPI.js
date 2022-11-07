import BaseAPI from '@/apis/base/baseapi.js'
import Http from '@/apis/base/httpConfig.js'
class AccountAPI extends BaseAPI {
    constructor(){
        super();
        this.Http = Http;
        this.controller = 'Account';
    }

    signup(payload){
        return this.Http.post(`${this.controller}/signUp`,payload);
    }

    completeProfile(payload){
        return this.Http.post(`${this.controller}/completeProfile`,payload);
    }

    signIn(payload){
        return this.Http.post(`${this.controller}/signIn`,payload);
    }
}

export default new AccountAPI();
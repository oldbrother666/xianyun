export const state = {
    userdata:{},
    allprice:0
}

export const mutations = {
    setName(state,data){
        state.userdata = data
    },
    setallprice(state,price){
        state.allprice = price
    }
}

export const actions= {
    login({commit},data){
        return this.$axios({
            url:'/accounts/login',
            method:'post',
            data
        }).then(res=>{
            console.log(res.data)
            localStorage.setItem('xianyu',res.data)
            commit('setName', res.data)
            this.$router.push({path:'/'})
            return true
        })
    }
}
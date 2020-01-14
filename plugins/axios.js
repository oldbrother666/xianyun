//引入element-ui组件
import { Message } from 'element-ui'

// 拦截器
export default ({$axios,redirect}) =>{
    // console.log(nuxt)
    $axios.onError(res =>{
        console.log(res.response)
        
        if(res.response.data.statusCode === 401 || res.response.data.statusCode === 403){
            redirect(200,'/user/login')
        }

        const {message} = res.response.data
        if(message === '用户名或者密码无效.'){
            Message.error(message)
        }
    })
}
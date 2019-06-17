// let ApiBaseURL = 'https://easy-mock.com/mock/59802015a1d30433d84f1a02/v1'
// let ApiBaseURL = 'http://plab.itcast.cn:7999'
// let ApiBaseURL = 'http://dev.plab.itcast.cn:7999'
let courseURL = 'http://localhost:3000/mock/11';
let BannerURL = 'http://localhost:9001';
module.exports = {
    proxyList: {
        '/banner/*': {
            target: BannerURL/*,
            changeOrigin: true,
            pathRewrite:{
                '^/banner':''
            }*/
        }
    }
    // },
    // proxyTable: {
    //     '/tt': {
    //       // 测试环境
    //       target: 'http://localhost:40400',  // 接口域名
    //       changeOrigin: true,  //是否跨域
    //       pathRewrite: {
    //           '^/tt': ''   //需要rewrite重写的,
    //       }              
    //     }
    // }
}

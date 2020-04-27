// const proxy = require('http-proxy-middleware');


// module.exports = function(app){
//     let options = {
//         target:'http://121.199.58.227:10001',
//         changeOrigin:true,
//         pathRewrite:{
//             "^/api/":"/"
//         }
//     }
//     var exampleProxy = proxy(options)
//     app.use('/api',exampleProxy)
// }

// module.exports = function(app){
//     app.use(
//         proxy(
//             '/api',{
//                 target:'http://120.79.56.242:8081',
//                 changeOrigin:true,
//             }
//         )
//     )
// }
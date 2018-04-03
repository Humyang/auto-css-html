

;let setip=''
if (process.env.NODE_ENV === 'production') {
 setip = 'http://118.89.19.201'
}else{
 setip = 'http://localhost'
}

export const IP = setip
export const ServerPort = 8602
export const StaticPort = 8600
export const OAUTH_PORT = 8000
// export {
//     devFix,
//     testFix
// }
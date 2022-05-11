import log4js from 'log4js';

log4js.configure({
    appenders:{
        console:{type:'console'},
        errorFile:{type:'file', filename:'./error.log'},
        errorLevelFilter:{
            type:"logLevelFilter",
            level:"error",
            appender:"errorFile"
        }
    },categories:{
        default:{
            appenders:['console', 'errorLevelFilter'],level:'all'
        }
    }
})
const logger = log4js.getLogger();
export default logger;
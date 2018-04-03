import plan from './module/plan.js'
// import btnControl from './btnControl.js'
export {
    plan
}


let api = {
    
    addTask(time,task){

    },
    getTaskList(){
        return [{
            id:"",
            task:"",
            startAt:"",
            status:['未开始','已开始','已暂停','已删除']
        }]
    },
    startTask(id){

    },
    stopTask(id){

    },
    dropTask(id){

    },
    finishTask(id){

    },
    deleteTask(id){

    }
}
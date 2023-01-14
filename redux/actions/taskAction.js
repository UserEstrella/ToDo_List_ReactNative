import { ADD_TASK, ALTER_TASK, DELETE_TASK, SHOW_TASK } from "../constantes"

export function addNewTask(task) {
    return {
        type: ADD_TASK,
        value: task
    }
}

export function alterOldTask(task) {
    return {
        type: ALTER_TASK,
        value: task
    }
}

export function removeTask(taskIndex) {
    return {
        type: DELETE_TASK,
        value: taskIndex
    }
}

export function showTask(taskIndex) {
    return {
        type: SHOW_TASK,
        value: taskIndex
    }
}
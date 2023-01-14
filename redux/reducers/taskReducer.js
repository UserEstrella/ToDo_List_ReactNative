import { ADD_TASK, ALTER_TASK, DELETE_TASK, SHOW_TASK } from "../constantes";

//Concerne la toute première initialisation
const initialState = {
    tasks:[],
    task:{}
};

//Variable pour faire l'auto-incrémentation des id
var nextId = 1;


const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            let newstock = {
                ...state,
                tasks: [...state.tasks, {id: nextId,titre: action.value.titre,description: action.value.description,dateDeb: action.value.dateDeb,dateFin: action.value.dateFin,statut: action.value.statut}]
                };
            nextId += 1;
            return newstock;

        case ALTER_TASK:
            let altered = action.value;
            const updatedArray=[];
            state.tasks.map(
                (item)=>{
                    if (item.id === altered.id){
                        item.id = altered.id
                        item.titre = altered.titre;
                        item.description = altered.description;
                        item.dateDeb = altered.dateDeb;
                        item.dateFin = altered.dateFin;
                        item.statut = altered.statut;
                    }
                    updatedArray.push(item);
                }
            )
            let afteralter ={
                ...state,
                tasks: updatedArray
            };
            return afteralter;

        case DELETE_TASK:
            let afterdeleted ={
                ...state,
                tasks: state.tasks.filter(
                    (index) => index.id !== action.value
                    )
            };
            return afterdeleted;

        case SHOW_TASK:
            let show = state.tasks.filter(
                    (index) => index.id == action.value
                    )
            let showed ={
                ...state,
                task: show[0]
            };
            return showed;
            
      default:
        return state;
    }
};

export default taskReducer;
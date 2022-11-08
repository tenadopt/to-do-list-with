import {v1} from "uuid";
import {ToDoListsType} from "../App";
import {removeToDoListAC, toDoListsReducer} from "./toDoListsReducer";



test('correct todolist should be removed', ()=>{
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    const startState: ToDoListsType[] = [
        {id: toDoListID1, title: 'What to learn', filter: 'All'},
        {id: toDoListID2, title: 'What to buy', filter: 'All'}
    ]

    const endState = toDoListsReducer(startState, removeToDoListAC(toDoListID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(toDoListID2)

})
import {v1} from "uuid";
import {FilterButtonType, ToDoListsType} from "../App";
import {
    addToDoListsAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'



test('correct todolist should be removed', ()=>{
    let toDoListID1 = v1();
    let toDoListID2 = v1();

    const startState: ToDoListsType[] = [
        {id: toDoListID1, title: 'What to learn', filter: 'All'},
        {id: toDoListID2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(toDoListID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(toDoListID2)

});

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist';

    const startState: ToDoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: 'All'},
        {id: todolistId2, title: "What to buy", filter: 'All'}
    ]

    const endState = todolistsReducer(startState,addToDoListsAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: ToDoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: 'All'},
        {id: todolistId2, title: "What to buy", filter: 'All'}
    ]

    const endState = todolistsReducer(startState,changeToDoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);


})

test('correct filter of todolist should be changed', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterButtonType = 'Completed';

    const startState: ToDoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: 'All'},
        {id: todolistId2, title: "What to buy", filter: 'All'}
    ]

    const endState = todolistsReducer(startState, changeToDoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
})
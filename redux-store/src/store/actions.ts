export const ADD_TOTO = '[Todod] Add Todo';
export const REMOVE_TODO = '[Todo] Remove Todo';


export class AddTodo {
    readonly type = ADD_TOTO;
    constructor(private payload: any){}
}

export class RemoveTodo {
    readonly type = REMOVE_TODO;
    constructor(private payload: any){}
}
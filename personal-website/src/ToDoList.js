import React from 'react'
import ToDo from './ToDo'

export default function ToDoList({todos, toggle}) {
    return(
        <div>
            MY 2 DO LIST
            <div>{todos.map(todo => { //map each element of todos as todo, to a ToDo object
                return <ToDo key={todo.id} todo={todo} toggle={toggle}/> //the element todo is a prop for ToDo
                //Each to do item is a ToDo object. To add them, or modify them, we must modify using ToDo.js
            })}</div>
        </div>
    )
}
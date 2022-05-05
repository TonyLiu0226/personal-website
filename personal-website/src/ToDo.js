import React from 'react'

export default function ToDo({todo, toggle}) {

    //THIS FUNCTION IS REQUIRED IN ORDER TO USE THE CHECKBOXES TO TOGGLE COMPLETE
    function handleClick() {
        //just calls our toggle function from app.js
        toggle(todo.id)
    }
    return(
        <div>
            <label>
                <input type="checkbox" checked={todo.finished} onChange={handleClick}></input>
                {todo.name}
            </label>
        </div>
    )
}
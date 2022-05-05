import './App.css';
import React, {useState, useEffect, useRef } from 'react';
import { AppBar } from '@mui/material';
import ToDoList from './ToDoList'

function App() {

  const lsk = 'todoApp.todos' //for local storage
  const lsk2 = 'bruh' //another key for local storage
  const toNameRef = useRef() //useRef allows us to reference data in html inputs in other functions
  const [tid, settid] = useState(0) //incremental user ids for each element in the list
  const [data, setData] = useState([]); //usestate returns an array.
  //destructure that array to set equal to the useState function
  //the array will be an array of ToDo objects. However the name of the array is ToDoList
  //ToDoList is the variable we will be changing, so we refer to it in the app

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(lsk))
    const storedId = JSON.parse(localStorage.getItem(lsk2))
    if (storedTodos) setData(storedTodos)
    if (storedId) settid(storedId)
  }, [])

  //second useEffect stores to do list items into local storage, so they are saved on refresh
  useEffect(() => {
    localStorage.setItem(lsk, JSON.stringify(data))
    localStorage.setItem(lsk2, JSON.stringify(tid))
  }, [data])

  //controls toggling whether items are complete or not
  function toggle(id) { 
    const newList = [...data] //NEVER DIRECTLY MODIFY STATE VARS, always make a copy and render that copy instead
    const todo = newList.find(todo => todo.id === id) //finds the id of the todo which we want to toggle
    if (todo.finished == true) {
      todo.finished = false
    }
    else {
      todo.finished = true
    }
    setData(newList) //sets the original todo list to our new todo list
  }

  //adds an item to the to do list
  function add(e) {
    const name = toNameRef.current.value //the name will be whatever the user currently has in the input
    if (name === '') return
    settid(tid + 1)
    setData(prevToDos =>
      {
        return [...prevToDos, {id: tid, name: name, finished: false}]
      })
  }

  //clears any incomplete items from the to do list
  function clear(e) {
    var i = 0;
    const newList = []
    data.forEach(todo => {
      if (!todo.finished) {
        newList[i] = todo;
        i++;
      } 
    })
    setData(newList)
  }

  //calculates the number of items left to do
  function checkComplete(e) {
    var i = 0;
    data.forEach(todo => {
      if (!todo.finished) {
        i++;
      } 
    })
    return i;
  }
  
  return (
    <div className="App">
      <ToDoList todos={data} toggle={toggle}/> 
      <input ref={toNameRef} type="text"/>
      <button onClick={add}>ADD ITEM</button>
      <button onClick={clear}>CLEAR COMPLETE ITEMS</button>
      <div>{checkComplete()} left to do</div>
    </div>
  );
}

export default App;

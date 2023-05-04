import { useEffect, useMemo, useState } from 'react'
import './App.css'

// const filter =  (a : string) => a.toLowerCase().includes("today") ;

function Caching() {

  const [filterName, setFilterName] = useState("");
  const todos = ["today : a", "yesterday : b", "c"]; 
  const filter = useMemo(() => (a : string) => a.toLowerCase().includes("today"), []) ;

  return (
    <>
      <div className="">parent component</div>
      <div className="">
          Filter by
          <button onClick={e => setFilterName("today")}>Today</button>
          <button onClick={e => setFilterName("yesterday")} >Yesterday</button>
      </div>
      {/* 값이 안바뀌고 그대로여도 재호출됨 */}
      <TodoList todos={["today : a", "yesterday : b", "c"]} filter={filter}/>
    </>
  )
}

export default Caching

const getFilteredTodos = (todos : string[], filter : (a : string) => boolean) => todos.filter(filter) ; 

const TodoList = ({todos, filter } : { todos : string[], filter : (a : string) => boolean}) => {

    console.log('재호출됨');
    
    // const [newTodo, setNewTodo] = useState('');
    // 🔴 Avoid: redundant state and unnecessary Effect
    const visibleTodos = getFilteredTodos(todos, filter)

    console.log(visibleTodos);
    
    return <>
        {visibleTodos.map((v,i) => {
          return <div className="" key={i}>
            {v}
          </div>
        })}
    </>
}
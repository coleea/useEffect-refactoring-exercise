import { useEffect, useMemo, useState } from 'react'
import './App.css'

function Parent() {

  const [state, setState] = useState(-1);
  return (
    <>
      <div className="">parent component      
          <div className="">              
              <button onClick={e => setState(Math.random())}>
                  state change randomly
              </button>
          </div>          
          <Child key={state} />
      </div>
    </>
  )
}

export default Parent

const Child = () => {
   
    const [state, setState] = useState("child state initialized");
    return <>
        <div className="" style={{margin : "2em"}}>
            children component
            <div className="">
              {`current state : ${state}`}
            </div>
            <button onClick={() => setState(Math.random().toString())}>change child state</button>
        </div>
    </>
}
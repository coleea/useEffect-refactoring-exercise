import { useEffect, useState } from "react";

export function FetchBestPractice() {
    
    const [id, setId] = useState(1);    
    const [user, setUser] = useState();

    useEffect(() => {        
        const controller = new AbortController()
        const signal = controller.signal
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {signal})
        .then(r => r.json())
        .then(setUser)
        .catch(err => {
            if(err.name === "AbortError") {
                console.error('AbortError발생 in catch');                
            } else {
               console.error(err)
            }
        })
        return () => controller.abort()
    }, [id]);


    return <>
        {user &&
            <div className="">
                <div className="">UserInfo</div>
                <div className="">{JSON.stringify(user)}</div>
            </div>            
        }
        <div className="" onClick={() => setId(1)}>Fetch User 1</div>
        <div className="" onClick={() => setId(2)}>Fetch User 2</div>
        <div className="" onClick={() => setId(3)}>Fetch User 3</div>
    </>
}
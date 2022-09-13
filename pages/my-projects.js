import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react';

export default function Home() {
    const [user, setuser] = useState([]);
    const [user_id, setuser_id] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined" || user_id == 0) return;

        fetch(`/api/get?id=${user_id}`, {
        }).then(res => res.json()).then(res => setuser(res))
    }, [user_id]);


    return (<>
        {user.length === 0 ?
            <label><h4>Enter your Id : </h4>
                <input type="text" value={user_id}
                    onChange={(e) => setuser_id(parseInt(e.target.value))}
                />
            </label>
            :
            <> <h1> user_id :: {user[0]?.user_id} </h1>
                {user.map(u => <div>
                    <ul>
                        <li>id :: {u.id}</li>
                        <li>project_id :: {u.project_id}</li>
                        <li>permit :: {u.permit}</li>
                        <li>Project name :: {u.project.name}</li>
                        <li>state :: {u.project.state}</li>
                        <li>date :: {u.project.date}</li>
                    </ul>
                </div>)}
            </>
        }</>
    )
}

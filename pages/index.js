import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient()

// export async function getServerSideProps() {
//     const id = 1;
//     const project = await prisma.project.findUnique({
//         where: { id },
//     });

//     return {
//         props: {
//             project
//         }
//     }


// }

import { useEffect } from 'react';

export default function Home({ project }) {


    useEffect(() => {
        if (typeof window === "undefined") return;

        // fetch("/api/create", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         project,
        //         access: {
        //             user_id: 1,
        //             permit: 'Create'
        //         }
        //     })
        // })

        fetch("/api/get?id=2", {
        }).then(res => res.json()).then(res => console.log(res))
    }, []);


    return (
        <h1>Its Working</h1>
    )
}

import React from 'react'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function requireAccess({ user_id, project_id = undefined, permit = undefined }) {

    if (!user_id) throw new Error("user_id null");

    return await prisma.access.findMany({
        where: { user_id, project_id, permit },
        include: {
            project: true,
        },
    });

}

import _ from 'lodash'
import React from 'react'
import { Table } from 'semantic-ui-react'
import { useState, useEffect } from "react";
import { Prisma, PrismaClient, State } from "@prisma/client";


function exampleReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }
            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                //data: state.data.sort((a, b) => b.column - a.column),
                direction: 'ascending',
            }
        default:
            throw new Error()
    }
}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const project = await prisma.project.findMany();

    const projects = project.map(proj => ({
        ...proj,
        date: proj?.date?.toJSON() || ""
    }));
    return {
        props: {
            projects
        }
    }

}
export default function Home({ projects }) {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        column: null,
        data: projects,
        direction: null,
    })
    const { column, data, direction } = state

    return (
        <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                    // sorted={column === 'id' ? direction : null}
                    // onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'id' })}
                    >
                        Id
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'name' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                    >
                        Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'state' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'state' })}
                    >
                        State
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'date' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'date' })}
                    >
                        Date
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(({ id, state, name, date }) => (
                    <Table.Row key={id}>
                        <Table.Cell>{id}</Table.Cell>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{state}</Table.Cell>
                        <Table.Cell>{date}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}


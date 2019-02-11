import React, { Component } from 'react'


function TodoList({ todos, render1 }) {
    return (
        <section className='main-section'>
            <ul className='todo-list'>{
                todos.map((todo, i) => (
                    <li key={i}>{render1(todo)}</li>
                ))
            }</ul>
        </section>
    );
}

const isCompleted = todo => todo.status === 'done'
const todos = [
    { label: 'Write tests', status: 'done' },
    { label: 'Sent report', status: 'progress' },
    { label: 'Answer emails', status: 'done' }
    ];

class Title extends React.Component {
    render() {
        return (
            <TodoList
            todos={ todos }
            render1={
            todo => isCompleted(todo) ?
            <b>{ todo.label }</b> : todo.label
            } />
        )
    }
}


export default Title;
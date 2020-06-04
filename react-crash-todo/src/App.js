import React, {Component} from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import {v4 as uuid} from 'uuid';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid(),
        title: 'Dinner',
        completed: false
      },
      {
        id: uuid(),
        title: 'Meetings',
        completed: false
      },
    ]
  }

  // toggle todo complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
}

// delete todo
delTodo = (id) => {
  this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
}

// add todo
addTodo = (title) => {
  const newTodo = {
    id: uuid(),
    title: title,
    completed: false
  }
  this.setState({ todos: [...this.state.todos, newTodo]})
}

  render() {
    return (
      <div className="App">
        <div className="Container">
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <Todos 
            todos={this.state.todos} 
            markComplete={this.markComplete} 
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;

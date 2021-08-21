import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  state = {
    todos: [],
    todoToShow: "all",
    toggleAllComplete: true,
  };
  addTodo = (todo) => {
    this.setState((state) => ({
      todos: [todo, ...state.todos],
    }));
  };

  updateTodoToShow = (type) => {
    this.setState({
      todoToShow: type,
    });
  };

  toggleComplete = (id) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    }));
  };
  handleDeleteTodo = (id) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  };

  removeAllCompleteTodos = () => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.complete),
    }));
  };

  render() {
    let todos = [];
    if (this.state.todoToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todoToShow === "complete") {
      todos = this.state.todos.filter((todo) => todo.complete);
    }
    return (
      <div>
        <h3></h3>
        <TodoForm onSubmit={this.addTodo} />
        {/* {JSON.stringify(this.state.todos)} */}
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => {
              this.handleDeleteTodo(todo.id);
            }}
          />
        ))}
        <div>todos left :{todos.filter((todo) => !todo.complete).length}</div>
        <div>
          <button
            onClick={() => {
              this.updateTodoToShow("all");
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              this.updateTodoToShow("active");
            }}
          >
            Active
          </button>
          <button
            onClick={() => {
              this.updateTodoToShow("complete");
            }}
          >
            complete
          </button>
        </div>
        {this.state.todos.some((todo) => todo.complete) ? (
          <div>
            <button onClick={this.removeAllCompleteTodos}>
              remove all complete todos list
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() => {
              this.setState((state) => ({
                todos: state.todos.map((todo) => ({
                  ...todo,
                  complete: state.toggleAllComplete,
                })),
                toggleAllComplete: !state.toggleAllComplete,
              }));
            }}
          >
            toggle all complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todo';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Form from './components/Form';
import stateForm from './components/stateFormObject';
import './App.css';
//App component class
class App extends Component {
	state = {
		todos: [],
    counter:0,
    text: 'No Item'
	};
  //excuted when the component is mounted
	componentDidMount() {
		setInterval(() => {
      this.setState({counter: this.state.counter+1})
    }, 1000);    
	}

	// Toggle Complete
	markComplete = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			})
		});
	};
  // Delete Todo
  delTodo = (id) => {  
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)]
        })
        if(this.state.todos.length ===1)
          this.setState({text: 'No Item'}); 
        console.log(this.state.todos);   
  };
  // Delete Todo
  updateTodo = (id) => {  
    this.setState({title: 'Update'}); 
    console.log(this.state.title);   
};

  // Add Todo
  addTodo = () => {
    //const {description, deadline} = stateForm[0];
    if(stateForm[0]!== undefined && stateForm[0].description!== undefined){
      let newId;
      if(this.state.todos.length)
        newId = this.state.todos.length +1;
      else
        newId = 4;
      const inputTodo = { description: stateForm[0].description,
                          deadline: stateForm[0].deadline,
                          id: newId
                        }
      this.setState({ todos: this.state.todos.concat(inputTodo) });
      console.log(stateForm);
      console.log(this.state.todos);
      stateForm[0] = [];

    }
    else {
      let taskObject;
      fetch( 'https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw')
        .then(res =>res.json())
        .then(json => {
         taskObject = json;
        //this.setState({todos: json})
        let todosLength=this.state.todos.length;
        let flag = false;
        while((todosLength < taskObject.length ) && !flag){       
        const  newTodo = taskObject[todosLength];
        if(this.state.todos.includes(newTodo)) 
          todosLength += 1;
        else{
          this.setState({ todos: this.state.todos.concat(newTodo) }); 
          flag = true;
        }          
      }; 
      }) 
      //const randomIndex = Math.floor(Math.random() * Math.floor(3));    
      
    }    
    if(this.state.todos)
      this.setState({text: ''});   
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <div className='container'>
            <Header />
            <Route
              exact
              path='/my-app' 
              render={(props) => (
                <React.Fragment>
                  <h1>Tasks Todo</h1>
                  <h1>You have used {this.state.counter} seconds on this website</h1>
                  <div>
                    <Form addTodo = {this.addTodo} />
                  </div>
                  <div className="todoForm">
                    <AddTodo todos={this.state.todos} addTodo={this.addTodo} text={this.state.text}/>
                    <Todos
                      todos={this.state.todos}
                      title={this.state.title}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}                      
                    />
                  </div>
                </React.Fragment>
              )}
            />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
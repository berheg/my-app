import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todo';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Form from './components/Form';
import HeaderH1 from './components/formElement/header1'
import './App.css';
//App component class
class App extends Component {
	state = {
		todos: [],
    counter:0,
    text: 'No Item',
    inputDescription:'',
    inputDeadline: '',
    indexOfInput: 0
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
handleDescriptionChange = event => {
  this.setState({
    inputDescription: event.target.value
  })
  }
  handleDeadlineChange = event => {
  this.setState({
    inputDeadline: event.target.value
      })      
}
  // Add Todo
  addTodo = () => {   
    if(this.state.inputDescription!== '' && this.state.inputDeadline!== ''){
      let newId;
      if(this.state.todos.length)
        newId = this.state.todos.length +1;
      else
        newId = 4;
      const inputTodo = { description: this.state.inputDescription,
                          deadline: this.state.inputDeadline,
                          id: newId
                        }
      this.setState({ todos: this.state.todos.concat(inputTodo) });      
      console.log(this.state.todos);
      this.setState({inputDescription:''});
      this.setState({inputDeadline: ''});

    }
    else { 
      let taskObject;
      fetch( 'https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw')
        .then(res =>res.json())
        .then(json => {
         taskObject = json;        
        let todosLength=this.state.indexOfInput;
        let flag = false;
        while((todosLength < taskObject.length ) && !flag){       
          const  newTodo = taskObject[todosLength];       
          this.setState({indexOfInput: this.state.indexOfInput +1});        
          this.setState({ todos: this.state.todos.concat(newTodo) }); 
          flag = true;                
        }; 
      })        
      
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
                  <HeaderH1 title={"Tasks Todo"} />
                  <HeaderH1 title= {`You have used ${this.state.counter} seconds on this website`} />                  
                  <div>
                    <Form addTodo = {this.addTodo} 
                      handleDescriptionChange = { this.handleDescriptionChange}
                      handleDeadlineChange = { this.handleDeadlineChange }
                    />
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
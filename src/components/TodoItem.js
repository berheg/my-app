  
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  constructor(props) {
		super(props)

		this.state = {
      title: 'Edit',
      inputType: "checkbox"			
		}   
    };
  getStyle = () => {
    return {
      background:'#00FFFF',  
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    }
  }
  // Delete Todo
  updateTodo = (id) => { 
    if(this.state.title === 'Edit'){
      const inputValue = document.querySelector('input.inputCheckbox').innerHTML;
      this.setState({title: 'Update'});
      this.setState({inputType: 'text'});
      document.querySelector('input.inputCheckbox').value= inputValue;
    }      
    else{
      this.setState({title: 'Edit'});
      this.setState({inputType: 'checkbox'});
    } 
    console.log(this.state.title);   
};

  render() {
    const { id, description , deadline} = this.props.todo;
    const {title} = this.state;   
    return (
      <div style={this.getStyle()}>
        <p>
          <input type= {this.state.inputType} onChange={this.props.markComplete.bind(this, id) } 
          style={checkboxStyle} className = 'inputCheckbox'/> {' '}
          { description } | {deadline}
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>Delete</button>
          <button onClick={this.updateTodo} style={editBtnStyle}>{''} {title}</button> 
        </p>
      </div>
    )
  } 
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '10px 19px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'  
}
const editBtnStyle={
  background: '#ffA500',
  color: '#fff',
  border: 'none',
  padding: '10px 19px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'  
}
const checkboxStyle = {
  boxShadow: '0 0 0 5px orange'

}

export default TodoItem;
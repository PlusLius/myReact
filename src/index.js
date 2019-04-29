import React from './react'

// let element = React.createElement(
//   'div',
//   {
//     id:'plus',
//     onClick(){
//       alert('hello')
//     }
//   },
//   '我是一行文本'
// )

// React.render(element,document.getElementById('root'))

class Counter extends React.Component {
  constructor(props){
    super(props)
    this.state = {number:0}
  }
  componentWillMount(){
    console.log('willMount')
  }
  componentDidMount(){
    console.log('componentDidMount');
  }
  handleClick(){
    console.log(this.state.number += 1)
  }
  render(){
    let p = React.createElement(
      'p',
      {},
      this.state.number
    )
    let button = React.createElement(
      'button',
      {
        onClick:this.handleClick.bind(this)
      },
      '+'
    )
    return React.createElement(
      'div',
      {
        id:'counter'
      },
      p,
      button,
      counter2
    )
  }
}

class Counter2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {number:0}
  }
  componentWillMount(){
    console.log('count2 willMount')
  }
  componentDidMount(){
    console.log('count2 componentDidMount');
  }
  handleClick(){
    console.log(this.state.number += 1)
  }
  render(){
    return React.createElement(
      'div',
      {
        id:'counter2'
      },
      'counter2'
    )
  }
}

let counter = React.createElement(Counter)
let counter2 =  React.createElement(Counter2)
React.render(counter,document.getElementById('root'))

//React.render('hello',document.getElementById('root'))

// let element = React.createElement(
//   'div',
//   {
//     id:'plus',
//     onClick:hello
//   },
//   React.createElement(
//       'button',
//       {
//         id:'btn'
//       },
//       '按钮'
//   )
// )
// function hello(){
//   alert('hello')
// }
// react.render(element,document.getElementById(root))
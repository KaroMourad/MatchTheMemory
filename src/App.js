import React, { Component } from 'react';
import './App.css';
import Square from "./Square";

class App extends Component {
  
  constructor(props) {
    super(props);
    let colors = ["red", "green", "blue", "yellow", "turquoise", "pink", "purple", "peru"];
    let cards = {};
    let list = [];
    this.refcards = [];
    this.initRandColors(cards,colors);//random color on board 
    this.state = {
      cards,
      list
    };
  }
  initRandColors = (cards,colors) => {
    let copyArrColors = colors.slice().concat(colors.slice());//to copy colors and select random colors
    let r,c;
    let arrR = [];
    for(let i=0;i<copyArrColors.length;i++) {
      arrR.push(i);
    }
    while(Object.keys(cards).length!==colors.length*2) {
      r = Math.floor(Math.random()*arrR.length);
      c = Math.floor(Math.random()*copyArrColors.length);
      cards[arrR[r]+"-"+copyArrColors[c]] = {
        flipped:false,
        guessed:false
      };
      copyArrColors.splice(c,1);
      arrR.splice(r,1);
    }
  }

  handleClick = (color) => {
    const mylist = this.state.list;
    if( (mylist[0] && color === mylist[0]) || this.state.cards[color].guessed ) {//check if click on the same square
        return;
    }
    if(mylist[1] && color === mylist[1]) {//check if click on the same square
      return;
    }
    else if(mylist[0] && mylist[1]) {
      if(mylist[0].split("-")[1] === mylist[1].split("-")[1]) {
        this.setState((state) => ({
          cards: {
            ...state.cards, 
            [color] : {
              flipped: true,
              guessed: state.cards[color].guessed
            },
            [mylist[0]]: { 
              flipped:true,
              guessed:true
            },
            [mylist[1]]: { 
              flipped:true,
              guessed:true
            }
          },
          list: [color]
        }), () => console.log(this.state));
      }
      else {
        this.setState((state) => ({
          cards: {
            ...state.cards, 
            [color] : {
              flipped: true,
              guessed: state.cards[color].guessed
            },
            [mylist[0]]: { 
              flipped:false,
              guessed:false
            },
            [mylist[1]]: { 
              flipped:false,
              guessed:false
            }
          },
          list: [color]
        }), () => console.log(this.state));
      }
    }
    else {
      this.setState((state) => ({
        cards: {
          ...state.cards, 
          [color] : {
            flipped: true,
            guessed: state.cards[color].guessed
          }
        },
        list: [
          ...this.state.list,
          color
        ]
      }), () => console.log(this.state));
    }    
  }

  render() {
    const {cards} = this.state;
    let flippedcardscount = 0;
    let allcardscount = 0;
    Object.keys(cards).forEach((color) => {
      allcardscount++;
      if(cards[color].flipped) {
        flippedcardscount++;
      }
    })
    if(flippedcardscount===allcardscount)  {
      return (
        <div style={mygif}>
          <img src="https://i.gifer.com/23R2.gif" alt="you win" />
        </div>
      );
    }
    return (
      <div className="App">
        {
          Object.keys(cards).map((color, i) => {
              return <Square key={i} color={color} flp={cards[color].flipped} onClick={this.handleClick}/>;
          })
        }
      </div>
    );
  }
}

export default App;

const mygif = { 
  top: "50%",
  left: "50%",
  position: "absolute",
  display: "inline-block",
  transform: "translate(-50%,-50%)"
};
import React, { Component } from 'react';
import './App.css';
import Header from './Header';


var Buffer = require('buffer/').Buffer


class Journal extends Component {

  constructor(props) {
    super(props);
    this.state = {entry: '', value: "", finished: false, classifications: []};
    // value has to stay, it clears the text area so that a character is only added once

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state.entry); // doesn't work but I'll leave it
    this.setState({finished: true}); 
    this.classifyTextAPI(this.state.entry.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g));
    event.preventDefault();
  }

  handleChange(event) {
    // updates entry value to include newly typed character
    this.setState({entry: this.state.entry + event.target.value});
    
    
  }

  classifyTextAPI = (inputs) => {
    console.log("type of inputs is: " + typeof(inputs));
    var querystring = "";
    for(let i = 0; i < inputs.length; i++) {
      if(i == 0) {
        querystring += "\?input=\"" + inputs[i]+"\"";
      }
      else {
        querystring += "\&input=\"" + inputs[i]+"\"";
      }
    }
    querystring = encodeURI('/api/classify-text' + querystring);
    console.log("INPUT URL IN FRONTEND IS: " + querystring);
    fetch(querystring)
      .then(res => res.json())
      .then(classifications => this.setState({ classifications }));
  } 

  render() {
    const { finished } = this.state;
    const {classifications} = this.state;

    return (
      <div className="App">
        <h1>journaling</h1>
         {/* header */}
        <div>
          
          <ul>
            <li>Made for HooHacks 2023</li>
            <li>Madelyn K., Catherine X., Megan K.</li>
          </ul>
          <h2>Write your journal entry below:</h2><br></br>
        </div>

        { !finished ? (
          // if not finished:
          <div>

            <ul className="passwords">
              <form onSubmit={ this.handleSubmit }>
                <p>your entry:
                {/* manual spacing, can replace with CSS/styling */}
                <br></br>
                <br></br>
                {this.state.entry}</p>

                <textarea value={this.state.value} onChange={this.handleChange}/>
                <br></br> 

                <input type="submit" value="Done editing"></input>
              </form>
            </ul>
          </div>
        ) : (
          // if finished
          <div>
            <ul className="passwords">
                <p>your entry: <br></br><br></br>
                {this.state.entry}</p>
            </ul>
            <ul className="passwords">
              <p>your results: </p>
              {classifications.map((classif, index) =>
                <li key={index}>
                  {classif}
                </li>
                )}
            </ul>

            <div>
              <p>{classifications.includes("Catastrophizing") ? 
                <div>
                  <p>Steps to stop catastrophizing:</p>
                  <ul>
                    <li>Say "stop" out loud</li>
                    <li>Focus on what is rather than what if</li>
                    <li>Try not to latch onto thoughts, just let them pass through your mind</li>
                  </ul>
                </div>
              : ""}</p>
            </div>
            <div>
              <p>{classifications.includes("Anxiety") ? 
                <div>
                  <p>Ways to manage anxiety:</p>
                  <ul>
                    <li>Talk to someone you trust</li>
                    <li>Set aside time to focus on your worries so you're not worrying that you forgot something important</li>
                    <li>Journal/write down your worries</li>
                    <li>Do breathing exercises</li>
                  </ul>
                </div>
              : ""}</p>
            </div>
            <div>
              <p>{classifications.includes("Low self esteem") ? 
                <div>
                  <p>Ways to manage low self esteem:</p>
                  <ul>
                    <li>Take care of your physical health -- get enough sleep!</li>
                    <li>Say kind things to yourself</li>
                    <li>Ask people what they like about you</li>
                  </ul>
                </div>
              : ""}</p>
            </div>
            

          </div>
          
        )}
        <Header />
      </div>
    );
  }
}

export default Journal;
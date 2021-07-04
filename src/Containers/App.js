import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';

import {ReactComponent as Github} from "../Resources/github.svg";
import {ReactComponent as Linkedin} from "../Resources/linkedin.svg";
import {ReactComponent as Twitter} from "../Resources/twitter.svg";
import {ReactComponent as Instagram} from "../Resources/instagram.svg";

import Terminal from'./Terminal/Terminal'
import About from '../Components/About/About';
import ContactMe from '../Components/ContactMe/ContactMe';
import Experience from '../Components/Experience/Experience';
import Work from '../Components/Work/Work';

let timeoutID = null;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.terminal = React.createRef();
  }


  state = {
    tabs:[{name:"Terminal",displayed:true,id:0}],
    load:false,
    repos:[{name:"Chat Application",link:"https://zzchatz.netlify.app",description:"An innovative and responsive* chat application with tons of functionality like allowing user to sign in, create rooms with password, add description, edit self-profile with image and nickname, send files and audio over the chat, admin permissions to edit room details. Features includes last seen, auto scroll to bottom on new message, pagination (loadmore option), date-wise message display, delete message and like functionality.",languages:"React, Firebase(Backend)",size:0} , 
    {name:"Video Calling Application",link:"https://zzcallz.netlify.app ",description:"A seamless, responsive application with intuitive UI that allows users to one-to-one or group calls. Functionality includes a dashboard with list of active users and rooms,creating room for group calls, calling dialog for direct calls, buttons to toggle camera and mic, screen share, and a small but  aesthetic chat box on peer-to-peer connection. ",languages:"React,Redux, webRTC, Peer.js, Socket IO, Heroku",size:0}, 
    {name:"Mini Games + Music Player",link:"https://zz-asm.netlify.app ",description:"A responsive* web app that uses React frontend and Firebase as backend to allow signed-in user to play mini-games, like Yahtzee, Hangman, Lights-out and listen to music from in built library for an immersive experience. Functionality involves a friendly & intuitive UI having authorization (sign up / sign in / forgot password), review system, nav bar with react-scroll, “how to” modal pop-ups and react-routing.",languages:"React, JS, Firebase(Backend)",size:0},
    {name:"Ecommerce Application",link:"https://zz-asm.netlify.app ",description:"An app that uses React and allows signed-in user to buy products. Features includes a slider for latest product and newRelease updates. Functionality includes product wise or category wise search options, along with cart, +/- of products in the cart, a checkout form with shipping details and a stripe payment gateway.",languages:"React, Commerce.js(API), Stripe(API), Firebase(Backend)",size:0},
    {name:"Face Mask Detection",link:"https://face-mask-detector-e41bc.web.app",description:"A mask face detection model and its integration with web dev. This project was based on computer vision and deep learning, (a part of our mini project). The model is integration between deep learning and classical machine learning techniques with openCV, tensor flow and keras.",languages:"Python, HTML, CSS",size:0}]
  };



  setLoad = () =>{
    this.setState({load:!this.state.load})
  }
  setTimeoutId = (iTimeoutID) =>{
    timeoutID = iTimeoutID;
  }
 

  addTab = (tabName) =>{
    if(timeoutID !== undefined)
      clearTimeout(timeoutID);

    let tempTabs = [...this.state.tabs];

    if(tabName !=="Terminal" && tempTabs.findIndex((tab)=>tab.name === tabName) !== -1){
      let id = tempTabs[tempTabs.findIndex((tab)=>tab.name === tabName)].id;
      this.selectTab(id);
      return false;
    }

    tempTabs.map((tab)=>tab.displayed = false);
    console.log("Adding tabName: " + tabName);
    switch(tabName){   
      case "Terminal":{
        tempTabs.push({name:"Terminal",displayed:true});
        break;
      }

      case "About":{
        tempTabs.push({name:"About",displayed:true});
        break;
      }

      case "Education":{
        tempTabs.push({name:"Education",displayed:true});
        break;
      }

      case "Work":{
        tempTabs.push({name:"Work",displayed:true});
        break;
      }

      case "Contact":{
        tempTabs.push({name:"Contact",displayed:true});
        break;
      }
      
      default :{
        return false;
      }
    }
    this.setState({tabs:tempTabs});
    return true;
  }

  removeTab = (id) =>{
    if(timeoutID !== null)
      clearTimeout(timeoutID);

    const tempTabs = [...this.state.tabs];
    let index = tempTabs.findIndex((tab)=>tab.displayed === true);
    tempTabs[index].displayed = false;
    tempTabs[0].displayed = true;

    if(!Number.isInteger(parseFloat(id)))
      index = tempTabs.findIndex((tab)=>tab.name === id);
    else
      index = tempTabs.findIndex((tab)=>tab.id === id);
      
    if(index <= 0)
      return false;
    
    else
      tempTabs.splice(index, 1);
      
    this.setState({tabs:tempTabs})
    
    return true;
  }

  selectTab = (id) =>{
    if(timeoutID !== null)
      clearTimeout(timeoutID);

    let tempArr = [...this.state.tabs].reverse();
    let findIndex = () =>{
      for(let i = tempArr.length - 1; i >= 0 ;i--){
        if(tempArr[i].id === id)
          return i;
      }
      return -1;
    }
    let index = findIndex();
    console.log("index " + index);


    for(let i = 0; i < tempArr.length; i++){
      if(i === index){
        tempArr[i].displayed = true;
      }
      else
        tempArr[i].displayed = false;
    }
    tempArr.reverse();
    this.setState({tabs:tempArr});
  }

  getContent = () =>{
    let index = this.state.tabs.findIndex((tab) => tab.displayed);
    console.log("Selected Index is:  " + index);
    if(this.state.tabs[index].name === 'About')
      return <About></About>
    else if(this.state.tabs[index].name === 'Education')
      return <Experience></Experience>
    else if(this.state.tabs[index].name === 'Work')
      return <Work repos={this.state.repos} setLoad={this.setLoad} getLoad={this.state.load}></Work>
    else if(this.state.tabs[index].name === 'Contact')
      return <ContactMe></ContactMe>
    else
      return null;

  }

  render () {
 
    let id = 0;
    let cx = classNames.bind(styles);
    const allTabs = (
      <li id="tabs">
        {
        this.state.tabs.map((tab)=>{
          let classes = cx({indTab:tab.id!==0},{terminal:tab.id===0},{selectedTab:tab.displayed});
          tab.id = id;
          let result = (<li key={id} onClick={()=>this.selectTab(tab.id)} className={classes}>{tab.name}<b onClick={(e)=> {e.stopPropagation();this.removeTab(tab.id);}} className="closeX">X</b></li>);
          id++;
          return result;  
        })}
        <li id="addTab"onClick={()=>this.terminal.current.sendCommand("open terminal" )}>+</li>
      </li>
    );

   let content = this.getContent();
    
    

    return (      
    <div id="app">
      <ol id="navBar">
        <li onClick={()=> this.terminal.current.sendCommand("open aboutMe")}>About</li>
        <li onClick={()=> this.terminal.current.sendCommand("open education")}>Education</li>
        <li onClick={()=> this.terminal.current.sendCommand("open work")}>Work</li>
        <li onClick={()=> this.terminal.current.sendCommand("open contactMe")}>Contact Me</li>
      </ol>
      
      <ul className="links">
        <li><a href="https://github.com/aditya-mantri" target="_blank" rel="noreferrer"><Github className="svg" title=""></Github></a></li>
        <li><a href="https://www.instagram.com/o_.mantri._o/" target="_blank" rel="noreferrer"><Instagram className="svg" title=""></Instagram></a></li>
        <li><a href="" target="_blank" rel="noreferrer"><Twitter className="svg" title=""></Twitter></a></li>
        <li><a href="https://www.linkedin.com/in/aditya-mantri-8bb358123/" target="_blank" rel="noreferrer"><Linkedin className="svg" title=""></Linkedin></a></li>
      </ul>

      <div className="emailLine">
        <div className="email"><span onClick={()=> this.terminal.current.sendCommand("open contactMe")}>amantri7@gmail.com</span></div>
      </div>
      {allTabs}
      <Terminal 
        ref={this.terminal}
        addTab = {this.addTab}
        removeTab = {this.removeTab}
        setTimeoutId = {this.setTimeoutId}
        display = {this.state.tabs[0].displayed ? "" : "hideTerminal"}
        inView = {this.state.tabs[0].displayed}>   
      </Terminal>
      {content}

      
      
      <a href="https://www.linkedin.com/in/aditya-mantri-8bb358123" target="_blank" id="footer" rel="noreferrer">Created and Designed by Aditya Mantri</a>
    </div>
    );
  }
}

export default App;

import React, {useState, Fragment, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Terminal.css'
const Terminal = forwardRef((props, ref) => {
    const [getTerLine,setTerLine] = useState({Timer:33,Value:"Aditya@18_08_00:~$ ▮",blink:true});

    useImperativeHandle(
        ref,
        () => ({
            sendCommand(command) {
                if(getTerLine.Timer >= 0){
                    setCountDown();
                    clearTimeout(timeout)
                }


                clearTimeout(timeoutID);
                getTerLine.Value = "Aditya@18_08_00:~$ " + command;
                updateContent();
            }
         }),
     )


    const N = () =>{return (<Fragment><br/>⠀</Fragment>);}


    const starterArr = [
        (<h2>Aditya Mantri</h2>),
        (<h3 className="I">My portfolio{N()}</h3>),
        (<p>(Inspired by Linux Terminal)</p>),

        (<p><br/>To find your way through the Portfolio either use <u className="attention, I">Navigation</u>-OR-<u className="attention, I">Terminal</u>{N()}</p>),

        (<p>To Begin, Type:</p>),
        (<p className="indented"><b className="I">[1]</b> or <b className="I">[open aboutMe]</b></p>),
        (<p className="indented"><b className="I">[2]</b> or <b className="I">[open education]</b></p>),
        (<p className="indented"><b className="I">[3]</b> or <b className="I">[open work]</b></p>),
        (<p className="indented"><b className="I">[4]</b> or <b className="I">[open contactMe]</b></p>),
        <br/>
    ]
    let[content,setContent] = useState({
        arr:starterArr
    });
    useEffect(()=>{
        let element = document.getElementById("command-line")
        if(element !== null){
            element.scrollIntoView();
        }
    },[content.arr])


    const setCountDown = (num) =>{
        clearTimeout(timeoutID);
        let tempArr = [...content.arr];
        
        

        if(num === undefined){
            tempArr[10] = (<p></p>);
        }
        else
            tempArr[10] = (<p>No User Input Detected Opening "About-Me" Page in {num} Seconds ...{N()}</p>)

        setContent({arr:tempArr});
    }


    let [timeout,setT] = useState();
    useEffect(()=>{
        clearTimeout(timeoutID);
          setT(setTimeout(()=>{
            setCountDown();
            clearTimeout(timeoutID);
            getTerLine.Value = "Aditya@18_08_00:~$ 1";
            updateContent();
           
        },getTerLine.Timer * 1000))
    },[])


    const updateTerminalLine = (e) =>{
        clearTimeout(timeoutID);
        
        if(getTerLine.Timer >= 0){
            setCountDown();
            clearTimeout(timeout)
        }


 
        setTerLine({Value:("Aditya@18_08_00:~$ "  + parseString(e.target.value)),blink:true});
    }


    const updateContent =(e) =>{
        if(e !== undefined)
            e.preventDefault();

        clearTimeout(timeoutID);

        parseCommand(parseString());

        setTerLine({Value:"Aditya@18_08_00:~$ ",blink:true});
    }


    const parseString = (input)=>{
        
        let bufferIndex = 19;
        if(input !== undefined)
            return input.substring(bufferIndex).replaceAll("▮","");
        else
            return getTerLine.Value.substring(bufferIndex).replaceAll("▮","");
    }



    let timeoutID = setTimeout(() =>{
        if(props.inView === true){
            if(getTerLine.Timer === undefined){
                if(getTerLine.blink)
                    setTerLine({Value:(getTerLine.Value + "").replaceAll("▮",""),blink:!getTerLine.blink});
                
                else
                    setTerLine({Value: getTerLine.Value + ("▮"),blink:!getTerLine.blink});
            }
            else{
                getTerLine.Timer -= 1;
                if(getTerLine.blink){
                    getTerLine.Value = (getTerLine.Value + "").replaceAll("▮","");
                    getTerLine.blink = !getTerLine.blink;
                
                }
                else{
                    getTerLine.Value = getTerLine.Value + ("▮");
                    getTerLine.blink = !getTerLine.blink;
                }


                setCountDown(getTerLine.Timer);

                if(getTerLine.Timer === 0){
                    setCountDown();
                }
            }
                
        }
    },(getTerLine.Timer === undefined)?800:1000);
    props.setTimeoutId(timeoutID);
    


    let key = 0;
    const allTerminalText = (       
        <div className={"css-typing "}>           
            {content.arr.map((item)=>{
                return <Fragment key={key++}>{item}</Fragment>;
            })}
        </div>
    )


    let element = document.getElementById("command-line")
    if(element !== null && props.inView === true){
        if(element !== document.activeElement)
            element.focus();
    }

 
    const parseCommand = (command) =>{
        clearTimeout(timeoutID);

        let commandSelector = command.split(" ")

        let tempArr = [...content.arr];
        tempArr.push(<p>Aditya@18_08_00:~$ {parseString()}</p>);

        switch(commandSelector[0]){
            case "":{
                tempArr.push(<p>Aditya@18_08_00:~$ {parseString()}</p>);
                break;
            }

            case "clear":{
                if(commandSelector.length <= 1){
                    starterArr[10] = (<p></p>);
                    setContent({arr:starterArr});
                    return null;
                }
                else{
                    tempArr.push(<p>Aditya@18_08_00:~$ {parseString()}</p>);
                    tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);
                }
                break;
            }

            case "help":{
                if(commandSelector.length <= 1){
                    tempArr.push(<p  className="indented"><b className="I">[clear]</b>: clears command window</p>);
                    tempArr.push(<p  className="indented"><b className="I">[ls]</b>: list all files</p>);
                    tempArr.push(<p  className="indented"><b className="I">[close argument]</b>: close a specific  program or file</p>);
                    tempArr.push(<p  className="indented"><b className="I">[open argument]</b>: open a specific document<br/>⠀</p>);
                }
                else{ 
                    tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);                   
                }
                
                break;
            }

            case "ls":{
                if(commandSelector.length <= 1){
                    tempArr.push(<p  className="indented">File: aboutMe</p>);
                    tempArr.push(<p  className="indented">File: education</p>);
                    tempArr.push(<p  className="indented">File: work</p>);
                }
                else{ 
                    tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);                   
                }
                break;
            }

            case "1":{
                getTerLine.Value = "Aditya@18_08_00:~$ open aboutMe";
                return parseCommand("open aboutMe")
            }

            case "2":{
                getTerLine.Value = "Aditya@18_08_00:~$ open education";
                return parseCommand("open education")
             }

             case "3":{
                getTerLine.Value = "Aditya@18_08_00:~$ open work";
                return parseCommand("open work")
             }

             case "4":{
                getTerLine.Value = "Aditya@18_08_00:~$ open contactMe";
                return parseCommand("open contactMe")
             }

            case "open":{

                if(commandSelector.length <= 1)
                    tempArr.push(<p>Error Expected Argument open [argument]<br/>⠀</p>);

                else{ 
                    switch(commandSelector[1]){
                        case "aboutMe":{
                            if(props.addTab("About"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open redirecting...<br/>⠀</p>);
                            
                            break;
                        }

                        case "education":{
                            if(props.addTab("Education"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open redirecting...<br/>⠀</p>);
                            
                            break;
                        }

                        case "work":{
                            if(props.addTab("Work"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open redirecting...<br/>⠀</p>);
                            
                            break;
                        }

                        case "contactMe":{
                            if(props.addTab("Contact"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open redirecting...<br/>⠀</p>);
                            
                            break;
                        }

                        case "terminal":{
                            if(props.addTab("Terminal"))
                                tempArr.push(<p>Opening new {commandSelector[1]} tab ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open redirecting...<br/>⠀</p>);
                            
                            break;
                        }

                        default:{
                            tempArr.push(<p>Couldn't Find file: {commandSelector[1]}<br/>⠀</p>);
                            break;
                        }
                    }

                                       
                }
                break;
            }

            case "close":{
                let argument = commandSelector[1];

                if(commandSelector.length <= 1)
                    tempArr.push(<p>Error Expected Argument close [argument]<br/>⠀</p>);

                else{ 

                    switch(argument){
                        case "aboutMe":{
                            if(props.removeTab("About"))
                                tempArr.push(<p>aboutMe has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>aboutMe is not open<br/>⠀</p>);
                            break;
                        }

                        case "education":{
                            if(props.removeTab("Education"))
                                tempArr.push(<p>education has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>education is not open<br/>⠀</p>);
                            break;
                        }

                        case "work":{
                            if(props.removeTab("Work"))
                                tempArr.push(<p>work has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>work is not open<br/>⠀</p>);
                            break;
                        }

                        case "contactMe":{
                            if(props.removeTab("Terminal"))
                                tempArr.push(<p>contactMe has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>contactMe is not open<br/>⠀</p>);
                            break;
                        }

                        case "terminal":{
                            if(props.removeTab("Terminal"))
                                tempArr.push(<p>Terminal has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>New Terminal Tab is not open<br/>⠀</p>);
                            break;
                        }

                        default:{
                            tempArr.push(<p>{argument} does not exist<br/>⠀</p>);
                        }
                    }
                    
                }
                break;
            }

            default:
                tempArr.push(<p>{parseString()} is not a recognized command</p>);
                tempArr.push(<p>Type "help" for list of commands<br/>⠀</p>);                
                break;
        }

        setContent({arr:tempArr});
    }


   


    return (
        <div className={props.display + " main"}>
            {allTerminalText}
            <form onSubmit={updateContent}>
                <input id="command-line" type="text" autoFocus spellCheck="false" autoComplete="off" value={getTerLine.Value} onChange={updateTerminalLine}/>     
                <p>⠀</p>  
            </form>
        </div>  
          
    );

})
export default Terminal;
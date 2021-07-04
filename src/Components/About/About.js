import React from 'react';
import './About.css';
import '../../Containers/Terminal/Terminal.css'

const About = () =>{
    return(
    <section className = "main section">
        <div className="about">
            <div className="text">
                <div  className="header">
                    <h1>About Me</h1>
                </div>
                <p>Hello! I'm Aditya Mantri, an aspiring Software Engineer based in Maharastra, India.<br/>⠀</p>
                <p>Currently I'm in my Final Year at <a className="school"href="http://www.mnnit.ac.in/" target="_blank" rel="noreferrer">Motilal Nehru National Institute of Technology, Allahabad</a>. 
                    When I'm not coding or studying you'll find me curled up between painting, dancing, travelling or filmography. 
                <br/>⠀
                </p>

                <p>My qualities (which I am proud to show-off) includes:<br/>⠀</p>
                <ol className="technologies">
                <li>Team Player</li>
                <li>Open-Minded</li>
                <li>Problem Solving</li>
                <li>Hardworking</li>
                <li>Public Speaking</li>
                </ol>
                <br/>
                
                <p>Here are a few technologies I've worked with recently:<br/>⠀</p>
                <ol className="technologies">
                    <li>HTML & (S)CSS</li>
                    <li>JavaScript</li>
                    <li>DSA</li>
                    <li>C / C++</li>
                    <li>MySQL</li>
                    <li>React/Redux</li>
                </ol>
            </div>
            <div className="avatar"></div>
            <br/>
            <br/>
        </div>
    </section>
    );
}
export default About;
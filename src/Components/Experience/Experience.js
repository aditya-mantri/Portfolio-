import React, {useState} from 'react';
import './Experience.css';
import '../../Containers/Terminal/Terminal.css'

const Experience = () =>{
    let [curJob, selectJob] = useState(0);



    let experience = 
    [["B.Tech",(
        <div className="individualExperience">
            <h3>Motilal Nehru National Institute of Technology<span className="yellow">-MNNIT</span></h3>
            <p>July 2018 - Present</p>
            <ul className="jobDescription">
                <li>Computer Science Engineering</li>
                <li>Cumulative Performance Index: 8.34 CPI</li>
                <li>Prayagraj, UP, India</li>
            </ul>
        </div>

    )],
    ["XII",(
        <div className="individualExperience">
            <h3>International Indian School, Al-Jubail <span className="yellow">-IISJ</span></h3>
            <p>May 2017 - May 2018</p>
            <ul className="jobDescription">
                <li>Percentage: 81%</li>
                <li>Physics/Chemistry/Maths + Computer Science</li>
                <li>Jubail, Saudi Arabia</li>
            </ul>
        </div>
    )],
    ["X",(
        <div className="individualExperience">
            <h3>Dayanand Anglo Vedic<span className="yellow">-DAV</span></h3>
            <p>May 2015 - May 2016</p>
            <ul className="jobDescription">
                <li>Percentage: 95% (10 CGPA)</li>
                <li>Navi Mumbai, Maharashtra, India</li>
            </ul>
        </div>
    )],];


    let jobSelector = experience.map((job,key) => {
        let result = <li onClick={()=>{console.log(key);selectJob(key)}} key={key}>{job[0]}</li>;
        if(key === curJob)
            result =  <li onClick={()=>{selectJob(key)}} className = "jobSelected" key={key}>{job[0]}</li>
        return result
    })
    return(
    <div className = "experience main">
        <div>
            <div className="container">
                <span className="title">
                    <h1>My Education</h1>
                </span>
                <ul className="jobSelector">
                    {jobSelector}
                </ul>
                {experience[curJob][1]}
            </div>
        </div>
    </div>
    );
}
export default Experience;
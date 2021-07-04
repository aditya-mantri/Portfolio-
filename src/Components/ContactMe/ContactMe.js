import React from 'react';
import './ContactMe.css';
import '../../Containers/Terminal/Terminal.css'
import emailjs from 'emailjs-com';

const ContactMe = () =>{
    const submit = (e) =>{
        e.preventDefault();
        let email = document.getElementById("email").value;
        let subject = document.getElementById("subject").value;
        let message = document.getElementById("content").value;

        let templateParams = {
            from_name: email,
            to_name: 'amantri7@gmail.com',
            subject: subject,
            message: message,
           }

        if(email !== "" && subject !== "" && message !== ""){
            emailjs.send('service_pcaglc7', 'template_pst8m0f', templateParams, 'user_lBguQmShMNwLCU3OrCzGx')
            .then((result) => {
                alert("Email Sent Succesfully")
                console.log(result.text);
                document.getElementById("email").value = "";
                document.getElementById("subject").value = "";
                document.getElementById("content").value = "";
            }, (error) => {
                alert("Email Not Sent");
                console.log(error.text);
            });
        }
        else{
            alert("Please fill in all Fields");
        }


    }
    return(
    <div className = "main">
        <form onSubmit={submit}className="contactForm">
            <h3>Contact Me</h3>
            <p>If you have a question or simply want to say hello.</p>
            <input className="input" id="email" type="email" placeholder="Your Email"></input>
            <input className="input" id="subject" type="text" placeholder="Talk About?"></input>
            <textarea id="content"></textarea>
            <input type="submit" className="Submit" value="Submit"></input>
        </form>
    </div>
    );
}
export default ContactMe;
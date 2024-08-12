import React , {useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import please from '../photos/please.gif'
import yess from '../photos/yes.gif'
// import TypeIt from "typeit-react";
import TypeIt from 'typeit';
import ipdi from '../photos/ipdi.gif';
import Details from './Details';
// import { set } from 'animejs';



export default function Home() {

    const [yesButton, setyesButton] = useState(100); 
    const [imgsrc, setimgsrc] = useState(please)
    const [hurry, sethurry] = useState('none')
    const [yes, setyes] = useState(false)
    // const [showok, setshowok] = useState(false)
    

    function handleno(){
        increaseYesButton()
    }

    function increaseYesButton(){
      setyesButton(size => size+15);
    }

    function normalsize(){
      sethurry('block')
      setimgsrc(ipdi)
    }

    function handleyes(){
        setimgsrc(yess);
        setyes(true)
        document.getElementById('yes').style.display = 'none';
        document.getElementById('no').style.display = 'none';
        document.getElementById('type').style.display = 'block';
        setTimeout(normalsize,2000)
        setTimeout(() => {
          document.getElementById('ok').style.display = 'block';
        }, 12000);
    }

   
      const heroRef = useRef(null);
    
      useEffect(() => {
        if(yes){

        new TypeIt(heroRef.current, {
          speed: 100,
          startDelay: 2000,
        })
          .type("but yo shold", { delay: 100 })
          .move(-6, { delay: 100 })
          .type("u", { delay: 400 })
          .move(null, { to: "START", instant: true, delay: 300 })
          .move(1, { delay: 200 })
          .delete(1)
          .type("B", { delay: 225 })
          .pause(200)
          .move(5, { instant: true })
          .pause(200)
          .move(3, { instant: true })
          .move(2, { delay: 200 })
          .type("u", { delay: 350 })
          .move(2, { delay: 350 })
          .type(" ", { delay: 350 })
          .type("pay")
          .type(" ", { delay: 350 })
          // .move(-3, { delay: 150 })
          .delete(4)
          .type('<em><strong class="font-semibold">Pay</strong></em>', {
            speed: 100,
          })
          .type(" ", { delay: 350 })
          .type("fo")
          .type('r it..', { delay: 400 })
          .go();
        }

      }, [yes]);
    

  return (
    <Hom>
      <h1>A cup of coffee??</h1>
      <Image>
        <img id='change' src={imgsrc}/>
      </Image>
      <div>
        <button style={{ scale:`${yesButton}%` }} id='yes' onClick={handleyes}>Yes</button>
        <button id='no' onClick={handleno}>No</button>
      </div>
      <div style={{display:'none'}}id ='type' ref={heroRef}></div>
      <a href='/Details' >
        <button 
        style={{display:'none',border:'solid pink 2px', width:'100px',height:'50px',fontFamily:'cursive',fontSize:'20px'}} 
        id='ok' >okey</button>
      </a>
      
    </Hom>
  )
}



const Hom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height:100vh;

    h1{
        font-size: 34px;
    }


    :nth-child(3){
        display: flex;
        width:20vw;
        justify-content: space-between;
        gap:20vw;
        margin-top:20px;

        :nth-child(1){
            font-size: 30px;
            border-radius: 10px;
            background-color:beige;
        }

        :nth-child(2){
            font-size: 30px;
            border-radius: 10px;
            background-color:beige;
            position: absolute;
            margin-left: 15vw;
        }
    }
 `;

 const Image= styled.div`
    background-color: aliceblue;
    height:20vh;

 `;
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import { notificationPopup } from './components/Helpers';

const words = ['application', 'programming', 'interface', 'wizard',
'javascript', 'design']

let selectedWord = words[Math.floor(Math.random() * words.length)]

function App() {
  const [playable, setPlayable] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  useEffect(()=>{
    const handleKeydown = event => {
      const { key, keyCode} = event
      if(playable && keyCode >= 65 && keyCode <= 90){
        const letter = key.toLowerCase()
        if(selectedWord.includes(letter)){
          if(!correctLetters.includes(letter)){
            setCorrectLetters(curr => [...curr, letter])
          }else{
            //TODO - Show notifictaion for duplicate key press
            notificationPopup(setShowNotification)
          }
        }else{
          if(!wrongLetters.includes(letter)){
            setWrongLetters(curr => [...curr, letter])
          }else{
            //TODO - Show notifictaion for duplicate key press
            notificationPopup(setShowNotification)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () =>{
      window.removeEventListener('keydown', handleKeydown)
    }
  },[correctLetters,wrongLetters, playable])

  function playAgain(){
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])
    const random = Math.floor(Math.random() * words.length)
    selectedWord = words[random]
  }
  return (
    <>
     <Header />
     <div className="game-container">
       <Figure wrongLetters={wrongLetters}/>
       <WrongLetters wrongLetters={wrongLetters}/>
       <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      </div>
      <Popup selectedWord={selectedWord} correctLetters={correctLetters} 
        wrongLetters={wrongLetters} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;

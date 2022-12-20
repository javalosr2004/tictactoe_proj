
import React, { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import { ReactDOM } from 'react'
import Navbar from './Navbar'
import Banner from './Banner';
import highNote from '../assets/note-high.mp3'
import lowNote from '../assets/note-low.mp3'




export default function Board(){
    const [xSet, setXSet] = useState<number[]>([]);
    const [ySet, setYSet] = useState<number[]>([]);
    const [xWins, setXWins] = useState<number>();
    const [yWins, setYWins] = useState<number>();
    const [isWin, setIsWin] = useState(false);
    const [isStart, setStart] = useState(true);
    const [tie, setTie] = useState(false);
    const [winner, setWinner] = useState("");
    const [xName, setXName] = useState("")
    const [yName, setYName] = useState("")
    const highNoteRef = useRef<HTMLAudioElement>(null);
    const lowNoteRef = useRef<HTMLAudioElement>(null);

    let patternIndex: number = 0;
    const winningSets: number[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    
    const [isX, setIsX] = useState(true);
    
    function setGame(e: React.MouseEvent){
      const index: number = e.currentTarget.getAttribute('data-value') ? Number(e.currentTarget.getAttribute('data-value')) : 0;
      const prevSelected: boolean = (xSet.findIndex(i => i == index) != -1 || ySet.findIndex(i => i == index) != -1)
      console.log(prevSelected)
      if (!prevSelected){
        if (isX){
          if(highNoteRef.current){
            highNoteRef.current.play();
          }
          setXSet([...xSet, index]);
        } 
        else{
          if(lowNoteRef.current){
            lowNoteRef.current.play();
          }
          setYSet([...ySet, index]);
        }
        setIsX(!isX);
    }
      
    }

    function checkGame(set: number[]){
        for (let x of winningSets){
            let count: number = 0;
            for (let num of x){
                for (let setIter of set){
                    if (num == setIter){
                        count++
                    }
                }
            }
            if (count == 3){
                return true;
            }
        }
        return false;
    }

    function resetGame(){
      setXSet([]);
      setYSet([]);
      setIsWin(false);
      setTie(false);
      setWinner('');
      setIsX(true);
    }
    

    useEffect(() => {
        if (checkGame(xSet)){
          setWinner(xName);
          setXWins(xWins? xWins + 1 : 1);
          setIsWin(true);
        }
        else if (checkGame(ySet)){
          setWinner(yName);
          setYWins(yWins? yWins + 1 : 1);
          setIsWin(true);
        }
        else if(xSet.length + ySet.length == 9){
          setTie(true);
        }
      
    }, [xSet, ySet])
    
    return (
        <>
        <audio ref={highNoteRef} src={highNote}></audio>
        <audio ref={lowNoteRef} src={lowNote}></audio>
          <div className='flex justify-center h-10 mt-10'>
          {(isX && isStart == false && isWin == false) && <h1 className='text-2xl font-bold'>{xName}'s TURN</h1> }
          {(isX == false && isStart == false && isWin == false) && <h1 className='text-2xl font-bold'>{yName}'s TURN</h1>}
          </div>
          <div className='flex flex-col items-center'>
          <Banner start={isStart} win={isWin} tie={tie} winner={winner} xWins={xWins ? xWins: 0} yWins={yWins? yWins: 0} reset={() => {resetGame()}} xName={xName} yName={yName} setXName={(e: React.ChangeEvent<HTMLInputElement>) => setXName(e.target.value)} setYName={(e: React.ChangeEvent<HTMLInputElement>) => setYName(e.target.value)} setStart={() => {setStart(false)}}></Banner>
            <div className='mt-10'>
            {[0, 1, 2].map((x, index) => {
              return (
              <div className='flex visible flex-row bg-slate-400 w-96 h-[9rem]'>
                {[0, 1, 2].map((n) => {
                  if (patternIndex%2 == 0){
                  patternIndex++;
                  return (
                              <div data-value={patternIndex - 1}  onClick={(e) => {setGame(e)}} className='game-button bg-slate-600 w-32 h-[9rem] flex justify-center items-center'>
                                {(xSet.findIndex((i) => i == patternIndex -1) != -1) && <h1 className='text-[100px] scale-in z-auto'>X</h1>}
                                {(ySet.findIndex((i) => i == patternIndex -1) != -1) &&<h1 className='text-[100px] scale-in z-auto'>O</h1>} 
                              </div>
                )}
                patternIndex++;
                return (
                  <div data-value={patternIndex - 1}  onClick={(e) => {setGame(e)}} className='game-button bg-slate-500 w-32 h-[9rem] flex justify-center items-center'>
                     {(xSet.findIndex((i) => i == patternIndex -1) != -1) && <h1 className='text-[100px] scale-in z-auto'>X</h1>}

                    {(ySet.findIndex((i) => i == patternIndex -1) != -1) &&<h1 className='text-[100px] scale-in z-auto'>O</h1>} 
                  </div>
                )})}
                
              </div>
              )})}
              </div>
              </div>
      </>
    )
}

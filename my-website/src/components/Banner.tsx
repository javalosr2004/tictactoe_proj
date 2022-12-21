import React, { useRef } from 'react';
import '../index.css'
import './banner.css'

export default function Banner(props: {start:boolean, win: boolean, tie: boolean, winner: string, xWins: number, yWins: number,  reset: any, xName: string, setXName: any, yName: string, setYName: any, setStart: any}){
    
    const submit = useRef<HTMLButtonElement>(null);

    function resetStart(){
        props.setStart();
        props.reset;
    }

    function enterPressed(e: React.KeyboardEvent){
        if (e.key == 'Enter'){
            submit.current?.click();
    }
    }
    if (props.start){
        return (
            <div className='fade-in absolute rounded-3xl flex flex-col items-center bg-slate-900/[.85] w-[32rem] h-[32rem] mb-8 z-20'>
              <div className='flex flex-col justify-center items-center'>
                <h1 className=' text-3xl mt-16 font-bold mb-8'>Choose names: </h1>
                    <div className='flex flex-col bg-blue-400/50 p-8 rounded-xl '>
                    <input className='mb-2 ' type='text' data-lpignore="true" data-form-type="other" placeholder='Name 1' title='Name 1:' value={props.xName} onChange={props.setXName} onKeyDown={enterPressed}></input>
                    <input type='text' data-lpignore="true" data-form-type="other" title='Name 2:' placeholder='Name 2' value={props.yName} onKeyDown={enterPressed} onChange={props.setYName}></input>
                    </div>
                    <button ref={submit} className='transition ease-in-out underline hover:text-red-400/60 hover:scale-125 text-2xl mt-24' onClick={() => {if (props.yName.length > 0 && props.xName.length > 0){resetStart()}}}>Start</button>
                </div>
            </div>
        )
    }
    else if (props.win || props.tie){
        return (
            <div className='fade-in absolute rounded-3xl flex flex-col items-center bg-slate-900/[.85] w-[32rem] h-[32rem] mb-8 z-20'>
              {props.win && <div className='flex flex-col justify-center items-center'>
                <h1 className=' text-3xl mt-16 font-bold mb-8'>{props.winner} wins!</h1>
                    <div className='bg-blue-400/50 p-8 rounded-xl '>
                    {props.winner==props.xName && <h2>Total Wins: {props.xWins}</h2>}
                    {props.winner==props.yName && <h2>Total Wins: {props.yWins}</h2>} 
                    </div>
                </div>}
              {props.tie && <div className='flex flex-col justify-center items-center'>
                <h1 className=' text-5xl mt-16 font-bold mb-8'>TIE!</h1>
                <div className='bg-blue-400/50 p-8 rounded-xl '>
                <h2 className='font-normal'>{props.xName} Wins: <span className='font-bold'>{props.xWins}</span></h2>
                <h2>{props.yName} Wins: <span className='font-bold'>{props.yWins}</span></h2>
                </div>
              </div>}

              <button className='transition ease-in-out underline hover:text-red-400/60 hover:scale-125 text-2xl mt-24' onClick={props.reset}>Reset</button>
            </div>
        )
    }
    else{
        return (<></>)
    }
}
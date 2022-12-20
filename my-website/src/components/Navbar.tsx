import React from 'react';
import './nav_style.css'

export default function Navbar(){

    function openLink(url: string, name: string){
        const confirmation: boolean = confirm(`Open ${name}?`)
        if (confirmation){
            window.open(url, '_blank')
        }
        return 0;
    }

    return (
    <>
    <div className="nav_def">
       <h1 className='text-3xl py-4 transition ease-in-out duration-300 hover:text-orange-300 hover:scale-[2]' onClick={() => alert('TIC TAC TOE')}>Tic-Tac-Toe</h1>
       
    </div>
    </>
    )
}
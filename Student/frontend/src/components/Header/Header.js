import React from 'react'
import './Header.css'
export default function Header(props) {
    return <header className='text-white' id="Head">
        <div className="container py-2" id="heading"><h1>{props.name}</h1></div>
        
    </header>
}


import React from 'react';
import './Footer.css'

export default function Footer() {
    return (
        <>
            <footer className="text-center" id="foot">
                <div className="container text-white">
                    <em>&#169; Sayantan Bose<script>document.write(new Date().getFullYear());</script>. All rights Reserved.</em>
                </div>
            </footer>
        </>
    );
}

import React, { Fragment } from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <Fragment>
        <div className='footer'>
            <div className='main-footer'>
                <footer className='min-footer'>
                 <div className='flex-footer'>
                 <i class="fab fa-github"></i>
                 <h1>Blognex App</h1>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                 <a href="https://github.com/BadrKilou" target="_blank" rel='noopener noreferrer'>Follow me</a>
                 </div>
                 <div className='flex-footer'>
                 <i class="fab fa-github"></i>
                 <h1>Blognex App</h1>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                 <a href="https://github.com/BadrKilou" target="_blank">Follow me</a>
                 </div>
                 <div className='flex-footer'>
                 <i class="fab fa-github"></i>
                 <h1>Blognex App</h1>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                 <a href="https://github.com/BadrKilou" target="_blank">Follow me</a>
                 </div>
                </footer>
                <div className='copyright'>
                 <p>Made with Love By <strong>BADOX</strong></p>
                 </div>

            </div>
            
        </div>
        </Fragment>
    )
}

export default Footer

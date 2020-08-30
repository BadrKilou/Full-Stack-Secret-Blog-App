import React, { Fragment, useState, useEffect } from 'react';
import BlogSvg from '../../../Assets/BlogSvg.png';
import {Link} from 'react-router-dom';
import Sections from './Sections';
import Footer from './Footer';
import LoadSpinner from './LoadSpinner';
import Aos from 'aos';
import "aos/dist/aos.css";
import './Home.scss';


const Home = () => {
    const [loading, setLoading] = useState(true);

   useEffect(() => {
       setTimeout(() => {
       setLoading(false)
       }, 1000)
       Aos.init({ duration: 2000 })
   })


    return (
        <Fragment>
         {loading === false ? (     
             <>
        <div className='banner'>
            <div className="wrapper">
                <div className="grid-wrapper">
                <h2 className='heading-2' data-aos='fade-down'>Blognex The Blog App that hides your <strong className='strong'>Secrets</strong></h2>
                <p className='main-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos tempore quos sapiente, eveniet porro non.</p>
                <div className='action-div'>
                <Link className='cta-action-btn' to='/register'>Start for Free</Link>
                </div>
                </div>
                <div className='img-banner' data-aos='fade-up'>
                 <img src={BlogSvg} alt="BlogSvg"/>
                </div>            
            </div>
            <div className='svg' data-aos='fade-up'>    
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220"><path fill="#f3f3f3" fill-opacity="1" d="M0,32L48,48C96,64,192,96,288,106.7C384,117,480,107,576,128C672,149,768,203,864,202.7C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>     
        </div>
        <Sections />
        <Footer />
        </>
    
       ) : (
        <LoadSpinner />
    )}
         
        
        </Fragment>
        
    )
}

export default Home 

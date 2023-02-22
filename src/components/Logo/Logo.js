import React from "react";
import Tilt from "react-parallax-tilt";
import './Logo.css';
import brain from './brain.png'


const Logo = () => {
    return (
        <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{max : 75}} style={{height: '300px', width: '300px',}}>
        
        {/* //FIX IMAGE NOT BEING CENTERED! */}
        <div className="Tilt-inner pa3" style={{paddingTop: '5px'}} alt='logo' src={brain}>
          <img src={brain} alt='brain'/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

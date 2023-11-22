import React, {useEffect} from 'react';
import s from './landingPage.module.scss'
import leafclockLogo from '../../imgs/leafclock-logo.svg'

const LandingPage = () => {
    const gradientStyle = {
        background: 'linear-gradient(to bottom, #51cc7a, transparent)',
    };
    return (
        <div className={`${s.lpage}`} style={gradientStyle}>
            <div className={s.lpage_title}>

                🌿LeafClock time tracking

            </div>
            <div className={s.lpage_description}>Embrace the rhythm of time with our nature-inspired time tracking app.
                Watch your productivity bloom
                amidst the tranquil flow of LeafClock
            </div>
        </div>
    );
};

export default LandingPage;

import React from 'react'
import './animatedLogo.css'

export const MoviebaseAnimatedLogo = (): JSX.Element => {
  return (
        <div className='animated-logo-block'>
            <div className="logo-block">
                <div className='logo-outfit'>
                    <div className='logo'>
                        <div></div>

                        <div className='logo-horizontal-block' style={{ border: 'none', width: '40px', height: '10px' }}>
                            <div className='logo-horizontal'></div>
                            <div className='logo-horizontal'></div>
                        </div>

                        <div></div>
                    </div>
                </div>
            </div>
            <div className='big-logo-block'>
                <span className='big-logo-block-text'>Moviebase</span>
            </div>
        </div>
  )
}

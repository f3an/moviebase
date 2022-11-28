import React from 'react'
import './animatedLogo.css'

export const MoviebaseAnimatedLogo = (): JSX.Element => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 3,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272727c6'
      }}
    >
      <div className='animated-logo-block'>
        <div className='logo-block'>
          <div className='logo-outfit'>
            <div className='logo'>
              <div></div>

              <div
                className='logo-horizontal-block'
                style={{ border: 'none', width: '40px', height: '10px' }}
              >
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
    </div>
  )
}

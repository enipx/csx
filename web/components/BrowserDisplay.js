import React, { useState, useEffect } from 'react'
import BrowserDisplayHeader from './BrowserDisplayHeader'

const BrowserDisplay = ({ size, style, children }) => {
  const [sizeWidth, setSizeWidth] = useState("864px");
  const [displayHeight, setDisplayHeight] = useState("436px");

  useEffect(() => {
    if (size) {
      switch(size) {
        case "sm":
          setSizeWidth("500px");
          setDisplayHeight("400px");
          break;
          
          default:
            setSizeWidth("864px");
            setDisplayHeight("436px");
      }
    }
  }, [])

  return (
    <div className={`${style || ''}`} style={{maxWidth: sizeWidth}}>
      <BrowserDisplayHeader />
      <div className="w-full bg-grad-witchcraft dm-bg-secondary-800 p-4 md-p-6 browser-height" style={{height: displayHeight}}>
        { children}
      </div>
    </div>
  )
}

export default BrowserDisplay

import { useState } from 'react'
import { copyToClipboard } from '../utils/base';

const CopyToClipboard = ({ value, style, size }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyHandler = () => {
    copyToClipboard(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }

  return (
    <button onClick={copyHandler} className={`btn ${style}`} data-size={size || 'sm'}>
      { isCopied ? 'Copied' : 'Copy' }
    </button>
  )
}

export default CopyToClipboard

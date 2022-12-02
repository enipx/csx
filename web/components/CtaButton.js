import { useRouter } from 'next/router';
import { Category } from './icons/';


const CtaButton = ({ style, label, align }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/docs');
  }

  return (
    <button type="button" 
      className={`btn btn-ghost bg-grad-orange bdrs-lg c-white ${style || ''}`} 
      data-size="lg" data-icon={align || 'left'}
      onClick={handleClick}
      style={{ fontSize: '0.8rem' }}>
      <span className="btn_icon">
        <Category type="fill" style="w-3" />
      </span>
      {label || 'Start Building Now'}
    </button>
  )
}

export default CtaButton

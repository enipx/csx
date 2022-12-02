import CtaButton from './CtaButton';
import FluidContainer from './FluidContainer';

const Hero = ({ title, description, showCta, ctaText, align, style, ctaStyle }) => {
  const titleArr = title.split('|');
  const grad = {
    start: title.indexOf('|'),
    end: title.lastIndexOf('|'),
    text: '',
    formattedText: ''
  }
  grad.formattedText = title.slice((grad.start + 1), grad.end);
  grad.text = title.slice(grad.start, (grad.end + 1));

  return (
    <FluidContainer>
      <div className={`ta-${align || 'center'} maw-md ${style || ''}`}>
        <p className="c-dark h3 md-h2">
          {titleArr[0]}
          <span className="c-grad-orange">{ grad.formattedText }</span>
          {titleArr[titleArr.length - 1]}
        </p>
        {
          description && 
            <p className="fz-md md-fz-base c-secondary-600 dm-c-secondary-300 mt-2 mb-8 maw-sm mx-auto">{ description }</p>
        }
        {
          showCta && 
            <CtaButton label={ctaText} style={`mx-${align || 'auto'} ${ctaStyle || ''}`} />
        }
      </div>
    </FluidContainer>
    
  )
}

export default Hero

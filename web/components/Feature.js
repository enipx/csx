import BrowserDisplay from './BrowserDisplay'
import FluidContainer from './FluidContainer'
import Hero from './Hero'
import Image from 'next/image';

const Feature = ({ title, description, showCta, img, style, alt }) => {
  return (
    <FluidContainer style={style}>
      <div className="row">
        <div className="col-12 md-col-6 mb-12">
          <Hero 
            title={title}
            description={description}
            showCta={showCta}
            align="left"
            style="ta-center md-ta-left"
            ctaStyle="mx-auto md-ml-none"
          />
        </div>

        <div className={`col-12 md-col-6 ${alt ? 'md-ord-first' : ''}`}>
          <BrowserDisplay size="sm" style="mx-auto">
            <Image src={img} alt={`${title.toLowerCase()} image`} />
          </BrowserDisplay>
        </div>
      </div>
    </FluidContainer>
    
  )
}

export default Feature

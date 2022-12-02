import BrowserDisplay from "../components/BrowserDisplay";
import FluidContainer from "../components/FluidContainer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Image from 'next/image'

import slide1 from "../public/img/slide1.webp";
import Footer from "../components/Footer";
import { Card } from "../components/Card";
import CtaButton from "../components/CtaButton";

export default function Home() {
  return (
    <div className='container'>
      <Header navActive="0" />

      <div className="bg-light py-24 pb-52 bdb-secondary-100 dm-bdb-secondary-800">
        <Hero 
          title="Build Attractive |Website| At Speed"
          description="CSX is a UI design system and CSS framework based on utilities and components that provides you with the compositional unit needed to build your product easily."
          showCta={true}
          style="mx-auto"
        />
      </div>

      <FluidContainer style="fx-center-y" css={{marginTop: '-6rem'}}>

        {/* <SlideshowControl /> */}

        <BrowserDisplay style="mx-auto">
          <div 
            id="slideshow" 
            className="slideshow" 
            data-slide-animation="fade">
      
            <div className="slideshow_content">
              <div className="slideshow_item active">
                <Image src={slide1} alt="slide1" />
              </div>
      
              <div className="slideshow_item">
                <Image src={slide1} alt="slide1" />
              </div>
            </div>

          </div>
        </BrowserDisplay>

        {/* <SlideshowControl direction="right" /> */}

      </FluidContainer>

      <div id="features" className="bg-light py-28 pb-30 bdy-secondary-100 dm-bdy-secondary-800">
        <Hero 
          title="What I was |built| to do."
          description="Spend less time writing UI code while creating an outstanding experience for your customers."
          style="mx-auto"
        />

        <FluidContainer style="mt-20">
          <div className="maw-lg mx-auto d-grid gtc-1 md-gtc-3 gg-6">
            <Card
              num="01"
              title="Design system"
              description="Flexible and easily customizable design system with over 80+ drag-and-drop components and UI elements to use on Figma."
            />

            <Card
              num="02"
              title="Utilities"
              description="Utility classes with variants like media queries, gradients, hover, focus, etc. Making it easy to build well-engineered products faster."
            />

            <Card
              num="03"
              title="Components"
              description="Accessible and well-constructed components to use and it can be customized to suit your design need with our utility classes."
            />

            <Card
              num="04"
              title="Naming Convention"
              description="Our naming convention is similar to the Emmet abbreviation, so it's very easy to pick up CSX if you are already familiar with Emmet."
            />

            <Card
              num="05"
              title="Dark Mode."
              description={<>Support is available for dark mode using the <strong className="c-dark">dm-</strong> attr in front of any color, bg, gradient, and more utility that support dark mode.</>}
            />

            <Card
              num="06"
              title="Build fast"
              description="Includes components built to make the developer experience as pleasant as possible."
            />
          </div>

          <div className="fx-center mt-14">
            <CtaButton />
          </div>
        </FluidContainer>
      </div>

      <Footer showBorder={true} />

    </div>
  )
}

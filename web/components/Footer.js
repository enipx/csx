import { Config } from '../utils/config';
import Logo from './brand/Logo'
import {
  Twitter,
  Github,
  Behance,
  LinkedIn,
  Mail
} from './icons/';
import PageBorder from './PageBorder'

const Footer = ({ showBorder }) => {
  return (
    <>
      <div className="py-28 bg-light bdt-secondary-100 dm-bdt-secondary-800">
        <div className="ta-center">
          <Logo />
        </div>

        <p 
          className="mt-6 mb-4 fz-sm c-secondary-400 dm-c-secondary-300 ta-center">
          Designed and built with love by <strong><a className="c-dark" target="_blank" href="https://www.enipx.com/">{Config.author.name}</a></strong>
        </p>

        <div className="fx-center">
          <a href={Config.author.socials.behance} title="Behance" target="_blank"
            className="c-secondary-500 dm-c-secondary-300 lh-0">
            <Behance style="w-5 mr-6" />
          </a>

          <a href={Config.author.socials.github} title="Github" target="_blank"
            className="c-secondary-500 dm-c-secondary-300 lh-0">
            <Github style="w-4 mr-6"/>
          </a>

          <a href={Config.author.socials.twitter} title="Twitter" target="_blank"
            className="c-secondary-500 dm-c-secondary-300 lh-0">
            <Twitter style="w-4 mr-6"/>
          </a>

          <a href={Config.author.socials.linkedin} title="LinkenIn" target="_blank"
            className="c-secondary-500 dm-c-secondary-300 lh-0">
            <LinkedIn style="w-4 mr-6"/>
          </a>

          <a href={`mailto:${Config.author.socials.mail}`} title="Mail" target="_blank"
            className="c-secondary-500 dm-c-secondary-300 lh-0">
            <Mail style="w-4 mr-6"/>
          </a>
        </div>

      </div>
      { showBorder && <PageBorder /> }
    </>
  )
}

export default Footer

import { useEffect, useState } from 'react';
import { Config } from '../utils/config';
import CustomLink from './brand/CustomLink';
import Logo from './brand/Logo';
import FluidContainer from './FluidContainer';
import { Category } from './icons/';

const Header = ({ navActive }) => {
  const [links] = useState([
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Documentation',
      href: '/docs/intro'
    },
    {
      name: 'Features',
      href: '/#features'
    },
  ]);
  const [onScroll, setOnScroll] = useState(false);


  useEffect(() => {
    const handleScroll = () => setOnScroll(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`trs z-10 bg-light ${onScroll ? 'pos-fixed w-full t-0' : ''}`}>
      <header className={`h-18 bdb-secondary-100 dm-bdb-secondary-800`}>
        <FluidContainer style="h-full fx-center-y">
          <div className="fxg-1">
            <Logo />
          </div>

          <div className="d-none md-fx-center-y fxg-1">
            <div className="w-10 h-10 fx-center bdr-secondary-100 dm-bdr-secondary-800 mr-5 pr-2" data-size="sm">
              <Category style="w-4" />
            </div>
            <div>
              {
                links.map((link, index) => (
                  <CustomLink to={link.href} key={link.name}
                    style={`${(link.name === navActive || index === parseInt(navActive)) ? 'c-brand dm-c-brand ' : ''}fw-500 fz-sm mr-5`}
                  >
                    {link.name}
                  </CustomLink>
                ))
              }
            </div>
          </div>

          <div className="header-info d-flex ai-center">
            <a data-icon="left" data-size="sm"
              className="btn btn-outline bg-light hover-bg-light mr-2"
              href={Config.repo}
            >
              <span className="btn_icon">
                <svg className="w-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
              </span>
              <span>Github</span>
            </a>

            <button type="button" className="icon-btn c-secondary-600 hover-c-black dm-c-secondary-200 dm-hover-c-white bg-none hover-bg-none bd-none-all" data-size="sm" data-toggle="mode">
              <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="-18 -18 578.725 578.725" fill="currentColor"><path d="M440.055 412.5c-171.121-.199-309.801-138.871-310-310A306.76 306.76 0 0 1 147.457 0C40.691 60.27-16.641 181.168 4.258 301.977c20.906 120.805 115.516 215.422 236.324 236.32s241.703-36.43 301.973-143.199a306.43 306.43 0 0 1-102.5 17.402zm0 0"/></svg>
            </button>
          </div>
        </FluidContainer>
      </header>
    </div>
    
  )
}

export default Header

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from './Header';
import { Chevron, Search } from './icons/';
import { getArrSearchResult } from '../utils/base';

export const PageLayout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
      </Head>
      <div className="container">
        <Header />
        <div className='parent'>
          <div className="content">{children}</div>
        </div>
      </div>
    </>
  )
}

export const SideBarLayout = ({ nav, isActive }) => {

  const isActiveKey = getArrSearchResult({
    search: nav,
    value: isActive
  });

  const searchRef = useRef(null); 
  const [toggle, setToggle] = useState([isActiveKey.res]);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [curNav, setCurNav] = useState(nav)

  const storeToggleHandler = section => {
    if (toggle.length > 0) {
      if (toggle.includes(section)) {
        const allToggle = toggle.filter(val => val !== section);
        setToggle(allToggle);
      } else {
        setToggle(prev => [...prev, section])
      }
    } else {
      setToggle([section]);
    }
    
  }

  const toggleHandler = section => {
    return {
      icon: toggle.includes(section) ? 'rotate-down' : '',
      ul: toggle.includes(section) ? '' : 'd-none'
    }
  }

  const isActiveHandler = (val, arr) => {
    let res = false;

    if (typeof val === 'string' || val instanceof String) {
      return val === isActive ? 'active' : '';
    }

    if (Array.isArray(val)) {
      val.forEach((con) => {
        if (con && con.title === isActive) {
          res = true;
        }
      })
      return res ? 'doc-link-active' : '';
    }
  }

  const scrollToActiveToggle = () => {
    if (isActiveKey.res) {
      const isActiveKeyDOM = document.querySelector(`[data-nav="${isActiveKey.res}"]`);
      isActiveKeyDOM && isActiveKeyDOM.scrollIntoView({
        behavior: "smooth",
      });
    }
  } 

  const navSearchHandler = event => {
    const val = event.target.value;

    if (val) {
      const searchValues = getArrSearchResult({
        search: nav,
        value: val,
        all: true
      });

      const isNavEmpty = Object.values(searchValues.nav).every(key => Object.keys(key).length <= 0)

      if (isNavEmpty) {
        setSearchEmpty(true);
        setCurNav(searchValues.nav);
      } else {
        setSearchEmpty(false);
        setCurNav(searchValues.nav);
        setToggle(searchValues.toggle);
      }
      
    } else {
      setSearchEmpty(false);
      setCurNav(nav);
      setToggle(isActiveKey.res);
      scrollToActiveToggle();
    }
    
  }

  useEffect(() => {
    scrollToActiveToggle();

    const handleKeyUp = (evt) => {
      if (evt.shiftKey && evt.key === 'S') {
        searchRef.current.focus();
      }
    }

    if (window) {
      window.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div className="maw-full">

      <div className='form-group mb-6'>
        <div className="input-icon">
          <label className="sr-only" id="search-docs">Search Docs..</label>
          <span className="input-icon_icon c-dark">
            <Search width={18} height={18} style="w-4" />
          </span>
          <input ref={searchRef}
            type="text" id="search-docs" placeholder="Search Docs.."
            className="input input-icon_input focus-bd-dark" 
            onChange={(e) => navSearchHandler(e)}
          />
        </div>
        <p className="mt-2 fz-xs form-caption">
          Press <code className="fz-xxs fw-500">Shift</code> + <code className="fz-xxs fw-500">S</code> to focus
        </p>
      </div>

      <div className="ov-hidden ovy-scroll pb-16" style={{height: "calc(100vh - 11rem)"}}>
        {
          searchEmpty && 
          <div className="mr-4 mt-2 fz-sm p-4 bg-danger-50 bd-danger-200 bdrs-md">
            <p className="fz-sm c-danger-800 fw-500">No result found, Try a different keyword</p>
          </div>
        }
        {
          Object.keys(curNav).map((section, index) => (
            Object.keys(curNav[section]).length > 0 && 
            <div className="doc-section mb-8" key={index}>
              <p className="fz-base mb-4 c-secondary-800 dm-c-secondary-100 tt-capitalize">{section}</p>
              {
                Object.entries(curNav[section]).map((content) => (
                  <li key={content[0]} className="lis-none mb-5">
                    <p 
                      className={`fw-500 fz-sm trs cur-pointer c-secondary-500 dm-c-secondary-200 mb-3 lts-sm d-flex ai-center ${isActiveHandler(content[1], content[0])}`} 
                      onClick={() => storeToggleHandler(content[0])}
                      data-nav={content[0]}
                    >
                      <Chevron
                        type="right"
                        style={`w-3 c-secondary-400 mr-2 trs ${toggleHandler(content[0]).icon}`} 
                      />
                      {content[0]}
                    </p>

                    <ul
                      className={`bdl-secondary-100 dm-bdl-secondary-800 pl-3 ml-2 mb-10 ${toggleHandler(content[0]).ul}`}
                    >
                      {
                        content[1].map(con => (
                          con && <li className={`my-4 ml-4 pl-2 doc-link ${isActiveHandler(con.title)}`} key={con.title}>
                            <Link href={con.href}>
                              <a className="fz-sm trs c-secondary-500 dm-c-secondary-200 dm-hover-c-secondary-50 td-none tt-capitalize">{con.title}</a>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

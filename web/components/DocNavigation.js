import { useEffect, useState } from 'react'
import { createPageLink } from '../utils/base'
import { Category } from './icons/'
import { SideBarLayout } from './Layout'

const pages = createPageLink(
  require.context(`../mdx/docs/?meta=title,shortTitle,published`, false, /\.mdx$/)
) 

const utilsPage = createPageLink(
  require.context(`../mdx/docs/utilities/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/utilities'
)

const componentsPage = createPageLink(
  require.context(`../mdx/docs/components/?meta=title,shortTitle,published`, false, /\.mdx$/),'docs/components'
)

export const documentationNav = {
  Documentation: {
    'Getting Started': [
      pages['intro'],
      // {
      //   title: 'Release Notes',
      //   href: 'https://github.com/enipx/csx/releases',
      //   category: 'documentation'
      // },
      // pages['optimization'],
    ],
  },
  Utilites: {
    Layout: [
      utilsPage['container'],
      utilsPage['fluid'],
      utilsPage['box-sizing'],
      utilsPage['display'],
      utilsPage['float'],
      utilsPage['clear'],
      utilsPage['object-fit'],
      utilsPage['object-position'],
      utilsPage['overflow'],
      utilsPage['position'],
      utilsPage['visibility'],
      utilsPage['z-index'],
    ],
    Flexbox: [
      utilsPage['flex'],
      utilsPage['flex-direction'],
      utilsPage['flex-wrap'],
      utilsPage['flex-grow'],
      utilsPage['flex-shrink'],
      utilsPage['order'],
      utilsPage['justify-content'],
      utilsPage['justify-items'],
      utilsPage['justify-self'],
      utilsPage['align-content'],
      utilsPage['align-items'],
      utilsPage['align-self'],
    ],
    Grid: [
      utilsPage['grid-template-columns'],
      utilsPage['grid-template-rows'],
      utilsPage['grid-column'],
      utilsPage['grid-row'],
      utilsPage['grid-auto-flow'],
      utilsPage['grid-gap'],
      utilsPage['column-gap'],
      utilsPage['row-gap'],
    ],
    Spacing: [
      utilsPage['padding'],
      utilsPage['margin'],
    ],
    Sizing: [
      utilsPage['width'],
      utilsPage['max-width'],
      utilsPage['min-width'],
      utilsPage['height'],
      utilsPage['max-height'],
      utilsPage['min-height'],
    ],
    Typography: [
      utilsPage['font-family'],
      utilsPage['color'],
      utilsPage['text-gradient'],
      utilsPage['font-size'],
      // utilsPage['font-smoothing'],
      utilsPage['font-style'],
      utilsPage['font-weight'],
      utilsPage['letter-spacing'],
      utilsPage['line-height'],
      utilsPage['list-style'],
      // utilsPage['placeholder'],
      utilsPage['text-align'],
      utilsPage['text-decoration'],
      utilsPage['text-transform'],
      utilsPage['text-overflow'],
      utilsPage['vertical-align'],
      utilsPage['whitespace'],
      utilsPage['word-break'],
    ],
    Backgrounds: [
      utilsPage['background-attachment'],
      // utilsPage['background-clip'],
      utilsPage['background-color'],
      utilsPage['background-gradient'],
      // utilsPage['background-origin'],
      utilsPage['background-position'],
      utilsPage['background-repeat'],
      utilsPage['background-size'],
    ],
    Borders: [
      utilsPage['border-radius'],
      utilsPage['border-width'],
      utilsPage['border-color'],
      utilsPage['border-style'],
    ],
    Effects: [
      utilsPage['box-shadow'],
      utilsPage['opacity'],
    ],
    Transitions: [
      utilsPage['transition'],
      utilsPage['transition-duration'],
      utilsPage['transition-timing-function'],
    ],
    // Animations: [
    //   utilsPage['animation'],
    // ],
    Transforms: [
      // utilsPage['transform'],
      utilsPage['transform-origin'],
      utilsPage['scale'],
      utilsPage['rotate'],
      // utilsPage['translate'],
      utilsPage['skew'],
    ],
    Interactions: [
      utilsPage['appearance'],
      utilsPage['cursor'],
      utilsPage['outline'],
      utilsPage['pointer-events'],
      // utilsPage['resize'],
      utilsPage['user-select'],
    ],
    SVG: [
      utilsPage['fill'],
      utilsPage['stroke'],
      utilsPage['stroke-width']
    ],
    Accessibilty: [
      utilsPage['screen-readers']
    ]
  },

  Components: {
    Forms: [
      componentsPage['buttons'],
      componentsPage['icon-button'],
      componentsPage['inputs'],
      componentsPage['select'],
      componentsPage['textarea'],
      componentsPage['checkbox'],
      componentsPage['radio'],
      componentsPage['switch'],
    ],

    Display: [
      componentsPage['table'],
      componentsPage['badge'],
      componentsPage['status-hinter'],
    ],

    Feedback: [
      componentsPage['alert'],
    ],

    Media: [
      componentsPage['avatar'],
    ],

    Navigation: [
      componentsPage['accordion'],
      componentsPage['breadcrumb'],
      componentsPage['hamburger'],
      // componentsPage['pagination'],
      componentsPage['slideshow'],
      componentsPage['tabs'],
    ],

    Overlay: [
      componentsPage['modal'],
      // componentsPage['dialog'],
      componentsPage['dropdown'],
      componentsPage['tooltips'],
    ],

  }
}

const DocNavigation = ({ active, style, toggleState }) => {
  const [toggle, setToggle] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const bpt = 'lg';

  const handleToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    const handleScroll = () => setOnScroll(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    toggleState && toggleState(toggle);
  }, [toggle])

  return (
    <>
      <button 
        className={`z-30 btn w-14 h-14 bdrs-full bg-primary bd-none c-light fx-center ${bpt}-d-none bxsh-md`}
        type="button" style={{bottom: '2rem', right: '3rem', position: 'fixed'}}
        onClick={handleToggle}>
        <Category style="w-4" />
      </button>
      <div className={`z-20 ${bpt}-w-80 ${style || ''}`}>
        <div 
          className={`trs pos-fixed ov-hidden ${toggle ? 'docNavFixed' : 'w-0'} ${bpt}-w-64 pt-6 ${bpt}-mr-4 bg-white dm-bg-secondary-900`}
          style={{top: `${onScroll ? '72px' : '72px'}`}}>
          <SideBarLayout nav={documentationNav} isActive={active || 'intro'} />
        </div>
      </div>
    </>
  )
}

export default DocNavigation

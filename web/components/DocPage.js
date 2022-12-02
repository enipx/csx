import { useState } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import DocNavigation, { documentationNav } from './DocNavigation'
import Footer from './Footer'
import FluidContainer from "./FluidContainer"
import { getArrSearchResult } from '../utils/base'
import CustomLink from './brand/CustomLink'
import { Chevron } from './icons/'
import { components } from './MdxComponents'
import MdxToc from './MdxToc'
import { DocsTable, PropsTable } from './docs/Table'

const DocPage = ({ file, style }) => {
  const [toggle, setToggle] = useState(false);
  const bpt = 'lg';

  const prevNext = getArrSearchResult({
    search: documentationNav,
    value: file.name
  });

  return (
    <>
      <div className='h-1 bg-brand pos-fixed b-0 w-full z-50'/>
      <FluidContainer style='d-flex mt-6 pos-relative'>
        <DocNavigation 
          active={file.name}
          toggleState={(val) => setToggle(val)} 
        />
        <div className={`docContent xl-pr-60 lg-pr-0 lg-pl-2 ${style || ''} ${toggle ? 'w-none ov-hidden' : 'w-full'} ${bpt}-w-full ${bpt}-d-block`}>
          <div className={`pb-14 ${bpt}-ml-10`}>
            <div className="mb-6 pb-4 bdb-secondary-100 dm-bdb-secondary-800">
              <p className="h3 md-h2 c-dark mb-2">
                {file.title}
              </p>
              <div className='fx-center-y'>
                <div 
                  className='fxs-0 status-hinter status-hinter-outline bdc-secondary-200 dm-bdc-secondary-600 mr-2' />

                <p className="c-secondary-600 dm-c-secondary-200 lh-lg">
                  {file.description}
                </p>
              </div>
            </div>

            <MDXRemote 
              {...file.content}
              components={{
                ...components,
                DocsTable,
                PropsTable,
              }}
              lazy 
            />

            <div className="mt-8 pt-8 fx-center-y bdt-secondary-50 dm-bdt-secondary-800">
              {
                prevNext.prev && 
                <CustomLink to={prevNext.prev.href} style="fw-500 fx-center-y tt-capitalize c-brand dm-c-brand">
                  <Chevron style="w-4 mr-1" />
                  {prevNext.prev.title}
                </CustomLink> 
              }
              {
                prevNext.next && 
                <CustomLink to={prevNext.next.href} style="fw-500 fx-center-y tt-capitalize ml-auto c-brand dm-c-brand">
                  {prevNext.next.title}
                  <Chevron type="right" style="w-4 ml-1" />
                </CustomLink> 
              }
            </div>
          </div>
        
          <Footer />
        </div>
        <MdxToc source={file.content} 
          style="toc z-10 pos-top-right pos-fixed"
        />
      </FluidContainer>
    </>
  )
}

export default DocPage

import React from 'react'
import Link from 'next/link';

const CustomLink = ({ to, children, logo, style }) => {
  const cls = {
    logo: 'c-secondary-900 dm-c-white hover-c-secondary-900 dm-hover-c-white',
    def: 'c-secondary-600 dm-c-secondary-300 hover-c-brand'
  }
  return (
    <Link href={to}>
      <a className={`${logo ? cls.logo : cls.def} td-none ` + style}>
        { children }
      </a>
    </Link>
  )
}

export default CustomLink

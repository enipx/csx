import React from 'react'

export const Card = (props) => {
  const { title, description, className } = props;

  return (
    <div className={`px-6 py-8 bg-white dm-bg-secondary-900 bd-secondary-100 dm-bd-secondary-800 bdrs-xl bxsh-kbd ${className}`}>
      <p className="fz-lg fw-500 c-dark">{ title }</p>
      {
        description && 
          <p className="fz-sm mt-2 c-secondary-500 dm-c-secondary-300">
            { description }
          </p>
      }
    </div>
  )
}

const FeatureStat = ({ num, title, description, style }) => {
  return (
    <div className={`p-4 md-px-8 ta-center md-ta-left ${style || ''}`}>
      {
        num &&
          <div className="mb-3 fx-center-y jc-center md-jc-start">
            <div 
              className="d-none md-d-block h-px w-8 bg-secondary-200 dm-bg-secondary-700 mr-3">
            </div>
            <p className="fw-700 c-brand">
              { num }
            </p>
          </div>
      }
      <p className="fz-xl fw-500 c-dark">{ title }</p>
      {
        description && 
          <p className="fz-md mt-2 c-secondary-600 dm-c-secondary-300">
            { description }
          </p>
      }
    </div>
  )
}

export default FeatureStat

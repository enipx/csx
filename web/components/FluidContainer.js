const FluidContainer = ({ children, style, css }) => {
  return (
    <div className={`fluid ${style || ''}`} style={css}>
      {children}
    </div>
  )
}

export default FluidContainer

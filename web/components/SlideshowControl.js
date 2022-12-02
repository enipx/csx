import { Chevron } from './icons/'

const SlideshowControl = ({ direction, id }) => {
  return (
    <button 
      type="button" 
      className="w-10 h-10 fx-center bd-secondary-200 dm-bd-secondary-800 bg-light c-dark bdrs-md cur-pointer"
      data-slideshow={`#${id || "slideshow"}`} 
      data-slide-to={`${direction === "right" ? "next" : "prev"}`}>

      <Chevron 
        type={direction || 'left'}
        strokeWidth="1.5"
        style="w-5" />
        
    </button>
  )
}

export default SlideshowControl
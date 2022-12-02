import { useEffect } from 'react'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push('docs/intro')
  })

  return (
    <div>
      
    </div>
  )
}

export default index

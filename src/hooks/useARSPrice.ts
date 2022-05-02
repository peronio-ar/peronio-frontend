import { useEffect, useState } from 'react'

const URL = 'https://api.bluelytics.com.ar/v2/latest'

const useARSPrice = () => {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      setPrice(data.blue?.value_avg)
    }
    fetchData()
  }, [])

  return price
}

export default useARSPrice

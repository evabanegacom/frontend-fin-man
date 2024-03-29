import { useEffect, useState} from 'react';
import RecommendationService from '../../services/recommendation-service';


const Recommendations = () => {
  const [ tips, setTips ] = useState<any>([])
  const getTips = async() => {
    const ressponse = await RecommendationService.getTips(2)
    console.log(ressponse)
    setTips(ressponse)
  }

  useEffect(() => {
    getTips()
  }, [])

  return (
    <div>Recommendations</div>
  )
}

export default Recommendations
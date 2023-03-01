import axios from 'axios';
const MY_KEY = '33229711-19a5fd6125c37356a31dee8eb'
export const searchQuery = async (search, page, setIsLoad, setImages) => {
  
  try {
      setIsLoad(true)
      const promise = await axios.get(`?key=${MY_KEY}&per_page=12&page=${page}&q=${search}`);
        const data = promise.data;
      setImages(data.hits);
    setIsLoad(false)
      } catch (error) {
        alert('Something wrong')
    }
}
    
 export const moreOnPage = async (setImages, page, search) => {
    try {
    const promise = await axios.get(`?key=${MY_KEY}&per_page=12&page=${page}&q=${search}`);
    const data = promise.data;
      setImages(prev => [...prev, ...data.hits])   
  } catch (error) {
    alert('Something wrong')
     }
  }
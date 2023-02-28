
import axios from 'axios';
import { SearchBar } from "./Searchbar/Searchbar";
import { Gallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { LoadMoreBtn } from "./Button/Button";
import { useState } from 'react';
import { GalleryContext } from 'Context/Gallery.context';

axios.defaults.baseURL = 'https://pixabay.com/api/'
const MY_KEY = '33229711-19a5fd6125c37356a31dee8eb'

export const App = ()=> {
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState({});
  const [search, setSearch] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
 

  const searchQuery = async (searchParam) => {
    try {
      setIsLoad(true)
      const promise = await axios.get(`?key=${MY_KEY}&per_page=12&page=${page}&q=${searchParam}`);
        const data = promise.data;
      setImages(data.hits);
      setIsLoad(false)
      } catch (error) {
        alert('Something wrong')
      }
    }

  const handleReadInput = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchQuery(search)
  }

  const handleClickImg = (e) => {
    if (e.currentTarget.nodeName === 'LI' || e.target.nodeName === 'DIV') {
      setModalOpen(!modalOpen);
       const imageId = e.currentTarget.id;
  const image = images.find((image) => image.id === Number(imageId));
      setModalImg({ ...image }); 
      window.addEventListener('keydown', handleCloseModalByEsc)
    }
  };

  const handleCloseModalByEsc = (e) => {
    if (e.keyCode === 27) {
      setModalOpen(false)
    }
  }
  const moreOnPage = async () => {
    try {
    const promise = await axios.get(`?key=${MY_KEY}&per_page=12&page=${page+1}&q=${search}`);
    const data = promise.data;
      setImages(prev => [...prev, ...data.hits])   
  } catch (error) {
    alert('Something wrong')
     }
  }
  

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
    moreOnPage()
    }

  
  
  const { largeImageURL } = modalImg

    return (<>
      < SearchBar
        onSubmit={handleSubmit}
        onChange={handleReadInput}
      />
      <GalleryContext.Provider value={{images, handleClickImg, isLoad}}>
        <Gallery/>
      </GalleryContext.Provider>
      
      {images.length > 0 && (<LoadMoreBtn onClick={handleLoadMore} />)}
      
      {modalOpen ? <Modal
        Image={largeImageURL}
        onClick={handleClickImg}
      />: ''}
    
    </>)
  
}
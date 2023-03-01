import { searchQuery } from 'Service/API';
import { moreOnPage } from 'Service/API';
import axios from 'axios';
import { SearchBar } from "./Searchbar/Searchbar";
import { Gallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { LoadMoreBtn } from "./Button/Button";
import { useEffect, useState } from 'react';
import { GalleryContext } from 'Context/Gallery.context';

axios.defaults.baseURL = 'https://pixabay.com/api/'


export const App = ()=> {
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState({});
  const [search, setSearch] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [LoadMore, setLoadMore] = useState(false)
 
  useEffect(() => {
    if(!search) return
    if(submit){
      searchQuery(search, page, setIsLoad, setImages,)
      setSubmit(false)
    }
    else if(LoadMore){
      moreOnPage(setImages, page, search,)
      setLoadMore(false)
      }

}, [submit, LoadMore, search, page])
  
 
  const handleReadInput = (e) => {
    setSearch(e.target.value)
    setPage(1) 
  }

  const handleSubmit = (e) => {
    if (search === '') {
      e.preventDefault()
      return
    }
    e.preventDefault()
    setSubmit(true)
    setPage(1)
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
 
  const handleLoadMore = () => {
    setPage(prev => prev + 1)
    setLoadMore(true)
    }

  
  
  const { largeImageURL } = modalImg
console.log(submit);
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
      />: null}
    
    </>) 
}
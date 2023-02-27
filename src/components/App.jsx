import { Component } from "react";
import axios from 'axios';
import { SearchBar } from "./Searchbar/Searchbar";
import { Gallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { LoadMoreBtn } from "./Button/Button";

axios.defaults.baseURL = 'https://pixabay.com/api/'
const MY_KEY = '33229711-19a5fd6125c37356a31dee8eb'

export class App extends Component {
 
  state = {
    images: [],
    modalImg: {},
    search: '',
    isLoad: false,
    ModalOpen: false,
    PerPage: 12,
    Page: 1
  }
  async componentDidMount() {

      window.addEventListener('keydown', this.handleKeyDown)
      
    try {
      this.setState({ isLoad: true });
      const promise = await axios.get(`?key=${MY_KEY}&per_page=${this.state.PerPage}`);
      const data = promise.data;
      this.setState({ images: data.hits });
      this.setState({ isLoad: false });
    } catch (error) {
        alert('Something wrong')
    }
  }
  
  async searchQuery(query) {
    try {
      this.setState({ isLoad: true });
      const promise = await axios.get(`?key=${MY_KEY}&per_page=12&q=${query}`);
      const data = promise.data;
      this.setState({ images: data.hits })
      this.setState({ isLoad: false });
    } catch (error) {
      alert('Something wrong')
    }
  }
  handleReadInput = (e) => {
    this.setState({ search: e.target.value })
    
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const query = this.state.search;
    this.searchQuery(query)
    this.setState({Page: 1})
  }

  handleClickImg = (e) => {
    console.dir(e.currentTarget);
    if (e.currentTarget.nodeName === 'LI' || e.target.nodeName === 'DIV') {
      this.setState(state => ({ ModalOpen: !state.ModalOpen }));
       const imageId = e.currentTarget.id;
  const image = this.state.images.find((image) => image.id === Number(imageId));
      this.setState({ modalImg: { ...image } }); 
      
    }
  };
  handleKeyDown = (event) => {
  if (event.keyCode === 27) {
    this.setState({ ModalOpen: false });
  }
};
  handleLoadMore = async () => {
    const { images, PerPage, Page } = this.state;
    const moreOnPage = PerPage + 12;
    const newPage = Page + 1;
  try {
    const promise = await axios.get(`?key=${MY_KEY}&per_page=${moreOnPage}&page=${newPage}`);
    const data = promise.data;
    this.setState({ images: [...images, ...data.hits], PerPage: moreOnPage, Page: newPage });
  } catch (error) {
    alert('Something wrong')
  }
  }
  render() {
    const {isLoad} = this.state
    const {largeImageURL} = this.state.modalImg
    return <>
      < SearchBar
        onSubmit={this.handleSubmit}
        onChange={this.handleReadInput}
      />
        <Gallery
        images={this.state.images}
        onClick={this.handleClickImg}
        Loader={isLoad}
        />
      
      <LoadMoreBtn
      onClick={this.handleLoadMore}
      />
      
      {this.state.ModalOpen ? <Modal
        Image={largeImageURL}
        onClick={this.handleClickImg}
      />: ''}
    
    </>
  }
}
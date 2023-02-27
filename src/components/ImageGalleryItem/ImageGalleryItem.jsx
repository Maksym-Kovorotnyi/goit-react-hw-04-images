import css from './ImageGalleryItem.module.css';
import { FallingLines } from 'react-loader-spinner';
import { useContext } from 'react'
import { GalleryContext } from '../../Context/Gallery.context'

export const Item = () => {
    const { images, isLoad, handleClickImg } = useContext(GalleryContext)
    return <>
        {images.map(({id, webformatURL}) =>
            <li onClick={handleClickImg} className={css.item} key={id} id={id}>{isLoad ? <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel='falling-lines-loading' />
                    :<img className={css.image} src={webformatURL} alt="" />}</li>)
}
</>
}
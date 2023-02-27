import css from './ImageGalleryItem.module.css';
import { FallingLines } from 'react-loader-spinner';

export const Item = ({ images, onClick, Loader }) => {
    return <>
        {images.map(({ id, webformatURL }) => <li onClick={onClick} className={css.item} key={id} id={id}>{Loader? <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel='falling-lines-loading' />
                    :<img className={css.image} src={webformatURL} alt="" />}</li>)
}
</>
}
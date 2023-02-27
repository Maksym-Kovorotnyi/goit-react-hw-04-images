import css from './ImageGallery.module.css'
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem'




export const Gallery =({images, onClick, Loader}) =>{
        return (<>
            <ul className={css.imageGallery}>
                {<Item
                    Loader={Loader}
                    onClick={onClick}
                    images={images}
                />}
            </ul>
        </>
        )
    }
  
import css from './ImageGallery.module.css'
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem'

export const Gallery = () => {
        return (<>
            <ul className={css.imageGallery}>
                <Item/>
            </ul>
        </>
        )
    }
  

import css from './Modal.module.css'
export const Modal =({Image, onClick,}) => {
        return <>
          <div
            onClick={onClick}
            className={css.overlay}>
            <div
              className={css.modal}>
              <img src={Image} alt="" />
            </div>
          </div>
</>

}
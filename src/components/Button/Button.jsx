import css from './Button.module.css';

export const LoadMoreBtn = ({onClick}) => {
    return <>
        <div className={css.container}>
        <button
            onClick={onClick}
                className={css.button} type="button">Load more</button>
            </div>
        </>
}
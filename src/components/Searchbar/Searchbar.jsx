import css from './Searchbar.module.css'

export const SearchBar=({onSubmit, onChange})=>{
    
 
        return <>
            <header className={css.searchbar} >
                <form
                    className={css.searchForm} 
                    
                    onSubmit={onSubmit}>
                    <button
                        className={css.button}
                        type="submit" >
                    </button>
                    <input
                        className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onChange}
                        
                    />
                </form>
            </header>
</>

}
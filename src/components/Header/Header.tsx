import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { useAppDispatch } from '../../store/hooks';
import { setPopupOpen } from '../../store/reducers/popup/popupReducer';

function Header() {
    const dispatch = useAppDispatch();
    const openPopup = () => {
        dispatch(setPopupOpen());
    }
    
    return ( 
        <header className={styles.container}>
            <img src={logo} alt="Sever-Invest Logo" className={styles.logo}/>
            <h1>Доска задач</h1>
            <button type='button' onClick={openPopup} className={styles.button}>Добавить задачу</button>
        </header>
    );
}

export default Header;
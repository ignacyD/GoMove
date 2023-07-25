import './HomePage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

function HomePage() {
    return (
        <div className='home-page'>
            <div className='delete-activity'>
                <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#000000",}} />
            </div>
            <div className='card-activity'>Card</div>
            <div className='accept-activity'>
                <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000",}} />
            </div>
        </div>
    )
}

export default HomePage;
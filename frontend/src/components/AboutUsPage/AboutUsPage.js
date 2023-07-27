import './AboutUsPage.css'
import {useState} from "react";
import testPhoto from '../../assets/images/test.jpg';

function AboutUsPage() {
    const [creators, setCreators] = useState([
        {
            id:1,
            name:"Lorem ipsum",
            desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id:2,
            name:"Lorem ipsum",
            desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ]);

    return (
        <div className="about-us-page">
            <div className="title-section">
                <h1>About GoMove</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="creators">
                {creators.map((creator) => (
                    <div className="creator" key={creator.id}>
                        <div className="img">
                            <img src={testPhoto} alt="ourPhoto" />
                        </div>
                        <div className="content">
                            <div className="link">
                                <h1>{creator.name}</h1>
                                <p>{creator.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutUsPage;
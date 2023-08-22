import {useState} from "react";
import {useNavigate} from "react-router-dom";
import './AdditionalUserInfoForm.css'
import Modal from "react-modal";
import loginFormStyles from "../../ModalStyles";

function AdditionalUserInfoForm() {
    const [city, setCity] = useState("");
    const [preferredActivity, setPreferredActivity] = useState("");
    const [description, setDescription] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/users/update/${localStorage.getItem("userId")}`, {
            headers: {Authorization: localStorage.getItem("jwt"), "Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify({
                "city": city,
                "preferredActivity": preferredActivity,
                "description": description,
                "userPhotoUrl": photoUrl
            })
        }).then(response => {
            if (response.status === 200) {
                console.log("Update info successful");
                navigate("/profile")
            } else {
                console.log("something went wrong")
            }
        })
    }
    return (
        <div className="additional-info">
            <h1>Please fill this form to give us info, so we can provide you personalized activities</h1>
            <Modal
                isOpen={true}
                style={loginFormStyles}
                class="additional-info-modal"
            >
                <form className="additional-info-form" onSubmit={handleSubmit}>
                    <div className="city-field">
                        <label className="city-label">City</label>
                        <input
                            className="city-input"
                            type="text"
                            id="city"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        ></input>
                    </div>
                    <div className="preferred-activity-field">
                        <label className="preferred-activity-label">Preferred activity</label>
                        <select
                            className="preferred-activity-select"
                            id="preferred-activity"
                            value={preferredActivity}
                            onChange={e => setPreferredActivity(e.target.value)}
                        >
                            <option value="SKATING">Skating</option>
                            <option value="CYCLING">Cycling</option>
                            <option value="WALKING">Walking</option>
                            <option value="RUNNING">Running</option>
                        </select>
                    </div>
                    <div className="description-field">
                        <label className="description-label">Description</label>
                        <input
                            className="description-input"
                            type="text"
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></input>
                    </div>
                    <div className="photo-url-field">
                        <label className="photo-url-label">Photo url</label>
                        <input
                            className="photo-url-input"
                            type="text"
                            id="photo-url"
                            value={photoUrl}
                            onChange={e => setPhotoUrl(e.target.value)}
                        ></input>
                    </div>
                    <button className="additional-info-submit-btn" type="submit">Update</button>
                </form>
            </Modal>
        </div>
    );
}

export default AdditionalUserInfoForm;
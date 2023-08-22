import {useState} from "react";
import {useNavigate} from "react-router-dom";
import './AdditionalUserInfoForm.css'
import Modal from "react-modal";
import loginFormStyles from "../../ModalStyles";
import {useRef} from 'react';
function AdditionalUserInfoForm() {
    const [city, setCity] = useState("");
    const [preferredActivity, setPreferredActivity] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        console.log(URL.createObjectURL(imageFile))
        setSelectedImage(URL.createObjectURL(imageFile));
    };
    const handleImageButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/users/update/${localStorage.getItem("userId")}`, {
            headers: {Authorization: localStorage.getItem("jwt"), "Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify({
                "city": city,
                "preferredActivity": preferredActivity,
                "description": description,
                "userPhotoUrl": selectedImage
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
            <Modal
                isOpen={true}
                style={loginFormStyles}
                class="additional-info-modal"
            >
            <h4 className="additional-info-title">Please fill this form to give us info, so we can provide you more personalized activities</h4>
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
                    <div className="photo-url-field">
                        <label className="photo-url-label">Photo url</label>
                        <button className="custom-file-button" onClick={handleImageButtonClick}>
                            Choose photo
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {selectedImage && (
                            <div className="selected-photo">
                                <h2>Uploaded Image:</h2>
                                <img src={selectedImage} alt="Uploaded"/>
                            </div>
                        )}
                    <button className="additional-info-submit-btn" type="submit">Update</button>
                </form>
            </Modal>
        </div>
    );
}

export default AdditionalUserInfoForm;
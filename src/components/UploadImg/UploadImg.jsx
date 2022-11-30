

import './UploadImg.css'
import 'bootstrap/dist/css/bootstrap.css';
import Btn from '../../components/Btn';
import { useState } from 'react';

import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';




function UploadImg() {
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [isUpload, setIsUpload] = useState(false);
    // progress
    const [percent, setPercent] = useState(0);

    const handleChange = e => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
            if(image!= null) {
                handleUpLoad();
            }
        }
    };

    const handleUpLoad = () => {
        const storageRef = ref(storage, `/files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef,image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (error) => {
                console.log(error);
            },
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setUrl(url);
                    setIsUpload(true);
                });
            }
        );
    }
    
    return (
        <div>
            <div className="bg-container"></div>
            <div className="mycontainer d-flex justify-content-between align-items-center 
            flex-column m-auto">
                <div className="d-flex justify-content-between align-items-center 
                flex-column">
                    <input type="file" className="form-control myinput"
                    onChange={handleChange}></input>
                    <p className="mb-0">Vui lòng chờ: {percent}%</p>
                </div>
                <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" className="img"/>  
                <div className="d-flex justify-content-end my-3">
                    <div className="cancel-btn" onClick={handleUpLoad}><Btn str="Tải lên"/></div>
                    {isUpload? 
                    <div><Btn str="Lưu"/></div>
                    :<></>}
                </div>
            </div>
        </div>
    )
}


export default UploadImg;
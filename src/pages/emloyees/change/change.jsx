
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './change.css'
import 'bootstrap/dist/css/bootstrap.css';
import Btn from '../../../components/Btn/Btn'
import UploadImg from '../../../components/UploadImg/UploadImg';
import avatar from '../../../assets/images/avatar_chu.jpg'
import { useNavigate } from 'react-router-dom';
import { faClose, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function Change() {
    const [isLoadImg,setIsLoadImg] = useState(false);
    const navigate = useNavigate()

    return ( 
        <div>
            {isLoadImg?
            (<div>
                <FontAwesomeIcon icon={faClose} className="close-btn" onClick={()=>{setIsLoadImg(false)}}/>
                <UploadImg/>
            </div>) 
            : <></>}
            <div className="container w1200 user-card-full card">
                <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                            <div className="m-b-25 m-t-10">
                                <img className="avatar-img img-radius" src={avatar}></img>
                            </div>
                            <button type="button" class="btn-upload d-flex justify-content-center align-items-center"
                            onClick={()=>{setIsLoadImg(true)}}>
                                    <FontAwesomeIcon icon={faUpload} className="fs-5 upload-img-btn"/>
                                    <div className="upload-img-text">Tải ảnh lên</div>
                            </button>
                            
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card-block">
                            <div className="m-b-20 p-b-5 b-b-default d-flex align-items-center justify-content-between">
                                <h3 className="f-w-600 mb-0">Sửa thông tin</h3>
                                {/* <img className="mdi mdi-square-edit-outline feather icon-edit" src={images.close}></img> */}
                            </div>
                            
                            <div className="row">
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Họ và tên</p>
                                    <input className="border0 text-muted f-w-400" />
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Email</p>
                                    <input className="border0 text-muted f-w-400" />
                                </div>
                            </div>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Số điện thoại</p>
                                    <input className="border0 text-muted f-w-400" />
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Địa chỉ</p>
                                    <input className="border0 text-muted f-w-400" />
                                </div>
                            </div>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Lịch làm việc</p>
                                    <input className="border0 text-muted f-w-400" />
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Lương</p>
                                    <input className="border0 text-muted f-w-400" />
                                </div>
                            </div>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Mật khẩu</p>
                                    <input type="password" className="border0 text-muted py-3 f-w-400 m-b-10" />
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Nhập lại mật khẩu</p>
                                    <input type="password" className="border0 text-muted py-3 f-w-400 m-b-10" />
                                </div>
                            </div>
                            
                            <div className="d-flex justify-content-end mt-3">
                                <div className="mx-4" onClick={()=> {navigate('/employees')}}>{Btn({str: 'Hủy'})}</div>
                                <div>{Btn({str: 'Lưu'})}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div> 
    );
}

export default Change;
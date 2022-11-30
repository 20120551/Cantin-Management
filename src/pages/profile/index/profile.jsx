import { ProtectComponent } from './../../../components/authorization';
import { role } from './../../../config';
import { faCoins, faUsers, faUtensils, faWarehouse, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Btn from '../../../components/Btn'
import './profile.css'
import 'bootstrap/dist/css/bootstrap.css';
import avatar from '../../../assets/images/avatar_chu.jpg'
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import { useUser } from '../../../hooks'
import { user } from './../../../store/actions'
import { userService } from './../../../services'

function Profile() {
    const [userState, userDispatch] = useUser()
    useEffect(() => {
        userService.getProfile()
            .then((response) => userDispatch(user.getProfile(response)))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
            
    }, [])
    
    console.log(userState)
    const info = userState;
    const navigate = useNavigate();
    
    return ( 
    <div>
        <ProtectComponent allowRoles={[role.OWNER]}>
            <div className="container mb-5 w1200 ">
                <div className="row no-gutters">
                    <div className="col-md-4 col-lg-4 p-0"><img className="avatarOwner-img" src={avatar}></img></div>
                    <div className="col-md-8 col-lg-8 p-0">
                        <div className="d-flex flex-column h-100">
                            <div className="d-flex flex-column justify-content-between px-5 py-4 bg-dark text-white">
                                <div className="py-3"></div>
                                <h4 className="display-5 fw-bold mb-0 fs-1">Căn tin B1</h4>
                                <div className="py-3"></div>
                            </div>
                            <div className="px-5 py-4 bg-black text-white">
                                <h6 className="mb-0 fs-4">{info.username!==''?info.userType.fullName:''} &amp; {info.username}</h6>
                            </div>
                            <div className="d-flex flex-row text-black flex-grow-1">
                                <div className="d-flex justify-content-center align-items-center flex-column p-4 bg-primary text-center skill-block pointer"
                                 onClick={()=>{navigate('/canteen')}}>
                                    <FontAwesomeIcon icon={faUtensils} className="icon-img mb-2"/>
                                    <h4 className="fs-4 mb-0 fw-bold">Căn tin</h4>
                                </div>
                                <div className="d-flex justify-content-center align-items-center flex-column p-4 bg-success text-center skill-block pointer"
                                 onClick={()=>{navigate('/warehouse')}}>
                                    <FontAwesomeIcon icon={faWarehouse} className="icon-img mb-2"/>
                                    <h4 className="fs-4 mb-0 fw-bold">Kho</h4>
                                </div>
                                <div className="d-flex justify-content-center align-items-center flex-column p-4 bg-warning text-center skill-block pointer" 
                                onClick={()=>{navigate('/employees')}}>
                                    <FontAwesomeIcon icon={faUsers} className="icon-img mb-2"/>
                                    <h4 className="fs-4 mb-0 fw-bold" >Nhân viên</h4>
                                </div>
                                <div className="d-flex justify-content-center align-items-center flex-column p-4 bg-danger text-center skill-block pointer" 
                                onClick={()=>{navigate('/bussiness')}}>
                                    <FontAwesomeIcon icon={faCoins} className="icon-img mb-2"/>
                                    <h4 className="fs-4 mb-0 fw-bold" >Doanh thu</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </ProtectComponent>
        <ProtectComponent allowRoles={[role.STAFF]}>
            <div className="container w1200 user-card-full card">
                <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                            <div className="m-b-25 m-t-10">
                                
                                <img className="avatar-img img-radius" src={avatar}></img>
                            </div>
                            <h3 className="f-w-600">{info.username!==''?info.userType.fullName:''}</h3>
                            <p className="text-uppercase">{info.kind}</p>
                            
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card-block">
                            <div className="m-b-20 p-b-5 b-b-default d-flex align-items-center justify-content-between">
                                <h1 className="f-w-600 mb-0">Thông tin</h1>
                                <FontAwesomeIcon icon={faXmark} className="mdi mdi-square-edit-outline feather icon-edit" onClick={()=>{navigate('/')}}/>
                            </div>
                            
                            <div className="row" >
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Họ và tên</p>
                                    <h6 className="text-muted f-w-400">{info.username!==''?info.userType.fullName:''}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Email</p>
                                    <h6 className="text-muted f-w-400">{info.username}</h6>
                                </div>
                            </div>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Số điện thoại</p>
                                    <h6 className="text-muted f-w-400">{info.phone}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="m-b-10 f-w-600">Địa chỉ</p>
                                    <h6 className="text-muted f-w-400">{info.address}</h6>
                                </div>
                            </div>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Lịch làm việc</p>
                                    <h6 className="text-muted f-w-400','m-b-10">{info.schedule}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p class="m-b-10 f-w-600">Lương</p>
                                <h6 className="text-muted f-w-400','m-b-10"></h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <div><Btn str={"Sửa"}></Btn></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        </ProtectComponent>
    </div>
          
    );
}

export default Profile;
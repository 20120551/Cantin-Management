
import './item.css'
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadImg from '../../UploadImg/UploadImg'
import { faClose, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

function Item({ 
    key,
    props,
}) {
    const [isLoadImg,setIsLoadImg] = useState(false);
    ////////////////////////////////
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = 5;
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    ///////////////////////////////
    return ( 
        
        <div>
             {isLoadImg?
            (<div className="custom-input-img">
                <FontAwesomeIcon icon={faClose} className="close-btn" onClick={()=>{setIsLoadImg(false)}}/>
                <UploadImg/>
            </div>) 
            : <></>}
            <div className="container w1200 user-card-full card">
                <div className="row m-l-0 m-r-0">
                    <div className="col-sm-2 bg-c-lite-green px-0 item-imgage-box ">
                        <img src={props.image} className="item-imgage"
                        onClick={()=>{setIsLoadImg(true)}}/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card-block">
                            <div className="m-b-20 b-b-default d-flex align-items-center justify-content-end">
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0 text-uppercase">{props.name}</h6>
                                </div>
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0">{props.product}</h6>
                                </div>
                                <div className="col-sm-3 d-flex align-items-center"> 
                                    <h6 className="text-muted f-w-400 mb0">{props.price}</h6>
                                </div>

                                <FontAwesomeIcon icon={faPenToSquare} 
                                className="col-sm-1 fs-4 faPenToSquare" 
                                data-bs-toggle="modal" data-bs-target={"#"+text}/>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id={text} tabindex="-1" 
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5 text-uppercase" id="exampleModalLabel">{props.name}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div className="row g-3">
                                                    <input type="text" className="form-control py-3 my-3" 
                                                    placeholder={props.name} aria-label="First name" name="name"
                                                    required/>
                                                </div>
                                                <div className="row g-3">
                                                    <input type="text" className="form-control py-3 my-3" 
                                                    placeholder={props.product} aria-label="First name" name="count"
                                                    required/>
                                                </div>
                                                <div className="row g-3">
                                                    <input type="text" className="form-control py-3 my-3" 
                                                    placeholder={props.price} aria-label="First name" name="price"
                                                    required/>
                                                </div>  
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-success">Save changes</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                            </div>
                            <h6 className="m-t-20 b-b-default f-w-600 mb0"></h6>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        
    );
}

export default Item;
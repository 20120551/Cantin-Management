
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './employee.css'
import 'bootstrap/dist/css/bootstrap.css';
import { faFile, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Employee({
    fullname,
    email,
    phone,
    address,
    schedule,
    salary,
    role,
}) {
    const navigate = useNavigate()
    const [isChange, setIsChange] = useState(false);
    const handleChange = () => {
        //
        navigate("/employees/change")
    }
    return ( 
        <div>
            {/* {isChange? 
            <div>
                <div className="bg-container" onClick={()=>{setIsChange(false)}}></div>
                
            </div>
            : <></>} */}
            <div className="container w1200 user-card-full card">
                <div className="row m-l-0 m-r-0">
                    <div className="col-sm-3 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="card-block">
                            <div className="m-b-20 b-b-default d-flex align-items-center justify-content-end">
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-4 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0">{fullname}</h6>
                                </div>
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0">{schedule}</h6>
                                </div>
                                <div className="col-sm-3 d-flex align-items-center"> 
                                    <h6 className="text-muted f-w-400 mb0">{salary + 'VNĐ'}</h6>
                                </div>

                                <FontAwesomeIcon icon={faPenToSquare} 
                                className="col-sm-1 fs-4 faPenToSquare" onClick={()=>{handleChange()}}/>
                            </div>
                            <h6 className="m-t-20 b-b-default f-w-600 mb0"></h6>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
          
     );
}

export default Employee;
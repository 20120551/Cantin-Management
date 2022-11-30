
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './employees.css'
import 'bootstrap/dist/css/bootstrap.css';
import Employee from '../../../components/employee/emloyee';
import Btn from '../../../components/Btn/Btn'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function Employees() {
    const data = [
        {
            fullname: 'Nguyễn Văn A',
            email: 'NguyenVanA@gmail.com',
            phone: '0123456987',
            address: 'TP. Thủ Đức',
            schedule: 'T2, T3, T7',
            salary: '3.000.000',
            role: 'Thu ngân',
        },
        {
            fullname: 'Nguyễn Văn A',
            email: 'NguyenVanA@gmail.com',
            phone: '0123456987',
            address: 'TP. Thủ Đức',
            schedule: 'T2, T3, T7',
            salary: '3.000.000',
            role: 'Thu ngân',
        },
    ]

    const navigate = useNavigate();

    return ( 
        <div>
            <div className="w1200 mb-4">
                <button type="button" class="btn-add d-flex justify-content-center align-items-center" onClick={()=>{navigate('/employees/create')}}>
                    <FontAwesomeIcon icon={faPlus} className="fs-5 create-employee-btn"/>
                    <div className="create-employee-text">Tạo mới</div>
                </button> 
            </div>
            {data.map(info => {
                return Employee(info)
            })}
            
           
        </div>
     );
}

export default Employees;
import './bussiness.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCableCar, faClipboardList, faDollar } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faComment } from '@fortawesome/free-regular-svg-icons';

function Bussiness() {

    
    return ( 
    <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800 text-uppercase">Tình hình kinh doanh</h1>
            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-light shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Report</a>
        </div>

        {/* <!-- Content Row --> */}
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Lợi nhuận</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faCalendar} className="fas fa-calendar fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Doanh thu</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faDollar} className="fas fa-dollar-sign fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Số đơn online</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">180</div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faClipboardList} className="fas fa-comments fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Tồn kho</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faComment} className="fas fa-comments fa-2x text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Content Row --> */}
        <div className="row">
            {/* <!-- Area Chart --> */}
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div
                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold color-primary">Thống kê doanh thu</h6>
                        <div className="dropdown no-arrow">
                            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink">
                                <div className="dropdown-header">Dropdown Header:</div>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <div className="chart-area">
                            <canvas id="myAreaChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Pie Chart --> */}
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div
                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold color-primary">Thống kê lợi nhuận</h6>
                        <div className="dropdown no-arrow">
                            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink">
                                <div className="dropdown-header">Dropdown Header:</div>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <div className="chart-area">
                            <canvas id="myAreaChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    )
}
export default Bussiness

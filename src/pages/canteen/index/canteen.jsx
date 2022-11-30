
import './canteen.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal'


import Item from '../../../components/warehouse/item/item';
import ImportGoods from '../../../components/modal/importGoods/importGoods';

import { useGoods } from '../../../hooks'
import { goods } from './../../../store/actions'
import { goodsService } from './../../../services'
import { useEffect } from 'react';

function Canteen() {
    const [goodsState, goodsDispatch] = useGoods();
    useEffect(() => {
        goodsService.getAllGoodsOnStoreRoom()
            .then((response) => goodsDispatch(goods.getAllGoodsOnStoreRoom(response)))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
            
    }, [])
    const Data = goodsState;
    return ( 
        <div className="w1200">
            <div className="warehouse-header">
                <div className="warehouse-title">Căn tin của bạn</div>
                <div className="d-flex">
                    <ImportGoods title="Thêm món" id="adGoods"/>  
                </div>
                
                
            </div>
            <h6 className="m-t-20 b-b-default f-w-600 mb0"></h6>
            <div className="warehouse-content">
                {/* <div className="warehouse-content__header">
                    <div className="row">
                        <div className="col">Tên món</div>
                        <div className="col">Đơn giá</div>
                        <div className="col">Số lượng</div>
                        <div className="col">Hình ảnh</div>
                    </div> 
                </div> */}
                <div className="warehouse-content__body">
                    {Data.map((d,index)=> {
                        console.log(index)
                        return <Item key={index} props={d}/>
                    })}
                </div>
            </div>
        </div>
     );
}

export default Canteen;
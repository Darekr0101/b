
import './style.css'

export default function TrackingOrder({ order }) {

    const { ship_order_code, createdDate, createdShipDate, completeDate, status_order } = order;
  

    return (
        <div className="card-body">
            <div className="steps">
                <div className="step completed">
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="pe-7s-cart" /></div>
                    </div>
                    <h4 className="step-title">Đơn hàng đã đặt</h4>
                    <span>{createdDate}</span>
                </div>
                <div className="step completed">
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="pe-7s-check" /></div>
                    </div>
                    <h4 className="step-title">Đã xác nhận thông tin</h4>
                    <span>{createdDate}</span>
                </div>
                <div className={`step ${status_order >= 1 ? 'completed' : ''}`}>
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="pe-7s-car" /></div>
                    </div>
                    <h4 className="step-title">Đã giao cho ĐVVC</h4>
                    <span>{createdShipDate ? createdShipDate : ''}</span>
                </div>
                <div className={`step ${status_order >= 2 ? 'completed' : ''}`}>
                    <div className="step-icon-wrap">
                        <div className="step-icon"><i className="pe-7s-star" /></div>
                    </div>
                    <h4 className="step-title">Thành công</h4>
                    <span>{completeDate ? completeDate : ''}</span>
                </div>
            </div>
            <div className="ship_code">
                {
                   ship_order_code && ship_order_code !== null ? (
                        <p>Mã vận đơn: <span>{ship_order_code}</span></p>
                    ) : ''
                }
            </div>
        </div>
    )
}

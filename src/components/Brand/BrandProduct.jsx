import { Link } from 'react-router-dom';
import { API_URL } from "actions/constants/constants";
import React from "react";

export default function BrandProduct(props) {
    const {brand} = props;
  return (
    <div className="right--inner">
      <div className="seller-info">
        <div className="overview-right center-item">
          <span className="seller-name">
            <span>Thương hiệu: {brand.name}</span>
          </span>
        </div>
      </div>
      <div className="seller-action ">
        <Link
          className="action"
          to={`/thuong-hieu/${brand.code}`}
        >
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <span>Xem thêm</span>
        </Link>
      </div>

      <div className="seller-benefit">
        <div className="benefit-item">
          <img
            alt="compensation-icon"
            src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl20BfgrgQRvgno3XmphKme2OwQuHjQXi7dA&usqp=CAU"
            height={20}
            width="auto"
          />
          <span>
            Hoàn tiền
            <br />
            <b>111%</b>
            <br />
            nếu hàng giả
          </span>
        </div>
        <div className="benefit-item">
          <img
            alt="guarantee-icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz3NCLU1cu1aYHnz3rZJcFlzJBArzfceyr9ZQb1lf4AQ&s"
            height={20}
            width="auto"
          />
          <span>
            {" "}
            Mở hộp
            <br />
            kiểm tra
            <br />
            nhận hàng{" "}
          </span>
        </div>
        <div className="benefit-item">
          <img
            alt="refund-icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5QARQ8uiHUoU5JO1i6-Mz2Gw2u5zizqKFoA&usqp=CAU"
            height={20}
            width="auto"
          />
          <span>
            Đổi trả trong
            <br />
            <b>30 ngày</b>
            <br />
            nếu sp lỗi
          </span>
        </div>
      </div>
    </div>
  );
}

import { getAllPromotion } from "actions/services/PromotionServices";
import React, { useEffect, useState } from "react";


const itembanner = [
  {
    id: 1,
     title: "Hè thả ga",
     content : "Hàng ngàn qùa tặng ưu đãi"
  },
  {
    id: 2,
     title: "Tháng 5 rực lửa",
     content : "Mua sắm những công nghệ mới nhất"
  },
  {
    id: 3,
     title: "Tưng bừng giảm giá",
     content : "Rinh ngay mặt hàng hot"
  },
  {
    id: 4,
     title: "Cấu hình khủng",
     content : "Rinh ngay mặt hàng hot"
  },
  

]

export default function Promotion() {

  const [items, setItems] = useState([]);

  const getData = () => {
    getAllPromotion()
      .then(res => setItems(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      <div className="row sm-gutter section__content ">
        <div className="col l-12 m-12 c-12">
          <div className="same-promotion-list">
            <div className="view-more-promo">
              <h3 className="home-product-title">Ưu đãi của bạn</h3>
            </div>
            <div className="never-show-promo">
            </div>
            

            {
              itembanner.map((item) => {
                return (
                  <div className="same-promotion-item" key={item.id}>
                    <div className="title">{item.title}</div>
                    <div className="content">
                      {item.content}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

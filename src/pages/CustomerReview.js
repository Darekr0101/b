import React, { useEffect, useState } from 'react'
import useTimeout from 'hooks/useTimeout';
import { getAllCommentByUser, deleteItem } from 'actions/services/CommentServices'
import Loading from 'components/Loading/Loading';
import { Link } from 'react-router-dom';
import AccountNavbar from 'components/AccountNavbar/AccountNavbar.';
import { getUserLogin } from 'actions/services/UserActions';
import DeleteIcon from "@material-ui/icons/Delete";


import {
    IconButton,
 
  } from "@material-ui/core";

  
export default function CustomerReview() {
    const [usercmt, setUsercmt] = useState([])
    const [loading, setLoading] = useState(true);
    const[reload, setReload] =useState(false);

    
   
    const [user, setUser] = useState({
        id: '',
        fullName: '',
        username: '',
    })

    const getUser = () => {
        getUserLogin()
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }
    
  
    
    const handleDeleteItem = (id) => {
        deleteItem(id)
      
      setUsercmt(prev => prev.filter(elm => elm.id !== id))
      };

      useEffect(()=>{
        getAllCommentByUser()
        .then((res) => {
            setUsercmt(res.data);
            //console.log('userCmt :>> ', res);
        })
        .catch((err) => {
            console.log(err);
        })
      },[reload])
     

 
    
    useEffect(() => {

        getUser();
          getAllCommentByUser()
            .then((res) => {
                setUsercmt(res.data);
                console.log('userCmt :>> ', res);
            })
            .catch((err) => {
                console.log(err);
            })
    },[])
    useTimeout(() => setLoading(false), loading ? 500 : null);
    return (

        <>
        <div className="row sm-gutter section__content">
        <div className="col l-12 m-12 c-12">
            <div className="home-product">
                <div className="row sm-gutter section__item">
                    <div className="col l-2-4 m-3 c-3">
                        <AccountNavbar name={user?.fullName} />
                    </div>
                    <div className="col l-9-4 m-9 c-9">
                        <div className="list-cusomer-order">
                            <div className="heading">Danh sách bình luận </div>
                            {
                                loading ? <Loading /> : (
                                    <table className="list__order-info">
                                        <thead>
                                            <tr>

                                            <th>Mã sản phẩm</th>
                                        
                                            <th>Ngày tạo</th>
                                            <th>Nội dung </th>
                                            <th>Đánh giá</th>
                                            <th>Xoá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usercmt.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            
                                                             <td>

                                                             <Link to={`/san-pham/${item.productId}/${item.slug}`} className="info-cusomer-order-link">
                                                             {item.productId}
                                                                        </Link>
                                                             </td>
                                                            
                                                                    
                                                                    <td>{item.createdDate}</td>
                                                                    <td>{item.content}</td>
                                                                    
                                                                    <td>{item.rating}</td>
                                                                        
                                                                        <td>
                                                                        <IconButton onClick={() => handleDeleteItem(item.id)}>
                                                                        <DeleteIcon color="secondary"  /> 
                                                                        </IconButton>
                                                                            
                                                                        </td>
                                                                    
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
                
        </>
    )
}

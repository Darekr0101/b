import React, { useState } from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from 'actions/services/UserActions';
import { useEffect } from 'react';
import { LOGIN_URL_FACEBOOK, LOGIN_URL_GOOGLE, LOGIN_URL_ZALO } from 'actions/constants/url';

const useStyles = makeStyles({
    text: {
        fontSize: '1.3rem'
    }
})

export default function LoginPage(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {

        document.title = "Đăng nhập"

        let isAuth = localStorage.getItem('token')
        if (isAuth && isAuth !== 'undefined') {
            props.history.goBack();
        }
    }, [props.history])

    const handleRedirectGoogle = () => {
        // window.location.href = LOGIN_URL_GOOGLE;
        // window.open(LOGIN_URL_GOOGLE);
        window.open(LOGIN_URL_GOOGLE, "_self", '').close();
    }

    const handleRedirectFacebook = () => {
        window.location.href = LOGIN_URL_FACEBOOK;
    }

    const handleRedirectZalo = () => {
        window.location.href = LOGIN_URL_ZALO;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            password
        }
        dispatch(login(data, history));
        // dispatch(login(data));
    }
    return (
        <>
            <div className="row sm-gutter section__content">
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        <div className="row sm-gutter section__item">
                            <div className="col l-6 m-4 c-4">
                                <div className="content-left">
                                    <h2>Đăng nhập</h2>
                                    <p>Đăng nhập để theo dõi đơn hàng, lưu <br />danh sách sản phẩm yêu thích, nhận<br /> nhiều ưu đãi hấp dẫn.</p>
                                    <img src="https://vietnaminsider.vn/wp-content/uploads/2017/12/vietnam-fastfact.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col l-6 m-8 c-8">
                                <ValidatorForm onSubmit={handleSubmit}>
                                    <Grid className="" container spacing={2}>
                                        <Grid item sm={12} xs={12}>
                                            <TextValidator
                                                className={classes.text}
                                                fullWidth
                                                type="text"
                                                name="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                label={
                                                    <span>
                                                        <span style={{ color: "red" }}>*</span>
                                                        Tên đăng nhập hoặc Email
                                                    </span>
                                                }
                                                validators={["required"]}
                                                errorMessages={["Trường này không được để trống"]}
                                            />
                                        </Grid>
                                        <Grid item sm={12} xs={12}>
                                            <TextValidator
                                                className={classes.text}
                                                fullWidth
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                label={
                                                    <span>
                                                        <span style={{ color: "red" }}>*</span>
                                                        Mật khẩu
                                                    </span>
                                                }
                                                validators={["required"]}
                                                errorMessages={["Trường này không được để trống"]}
                                            />
                                        </Grid>

                                        <Grid item sm={12} xs={12}>
                                            <Button
                                                variant="outlined" color="secondary"
                                                style={{ margin: '10px 0', width: '100%' }}
                                                className="btn btn--e-transparent-brand-b-2"
                                                type="submit"
                                            >Đăng nhập</Button>
                                        </Grid>
                                    
                                        <Grid item sm={12} xs={12}>
                                            <div className="auth-form__social">
                                                <Link to="#" onClick={handleRedirectGoogle} className="auth-form__social-google btn btn--size-s btn--width-icon">
                                                    <i className="auth-form__social-icon fab fa-google"></i>
                                                    <span className="auth-form__social-text">Kết nối với Google</span>
                                                </Link>
                                            </div>
                                        </Grid>
                                     
                                    </Grid>
                                </ValidatorForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
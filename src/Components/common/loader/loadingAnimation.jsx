import React from 'react'
import './loadingAnimation.scss';
import loaderImg from '../../../assets/img/small-loader.gif';
import { useSelector } from 'react-redux';

let LoadingAnimation = props => {
    const isLoading = useSelector((store) => store.loader.isLoading);
    // const { isLoading } = props
    return (
        <div>
            {isLoading &&
                <div className="loader-container">
                    <img src={loaderImg} />
                </div>
            }
        </div>
    )
};

export default LoadingAnimation;

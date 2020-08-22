import React from 'react';
import '../../../containers/pages/Register/Register.css'

const Button = ({ title, onClick, loading }) => {
    if (loading) {
        return <button className="btn-disable">Loading...</button>
    }
    return (
        <button className="btn" onClick={onClick}>{title}</button>
    )
}

//this.setState({
//    isLoading: true
//})
//setTimeout(() => {
//    this.setState({
//        isLoading: false
//    })
//}, 5000)

export default Button;

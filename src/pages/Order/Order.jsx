import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import './Order.css'

const Order = () => {
    const [orderList, setOrderList] = useState([])
    const [count, setCount] = useState(0)
    const [filters, setFilters] = useState({
        New: true,
        Packed: true,
        InTransit: true,
        Delivered: true
    });
    const getData = async () => {
        const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
        const json = await response.json();
        setOrderList(json)
        setCount(json.length)
    }

    useEffect(() => {
        getData()
        setCount(orderList.length)
    }, [])

    const inputhandle =(e)=>{
        const { name , checked} =  e.target;
        setFilters(prevFilter => {
            const nextFilter = {...prevFilter, [name]: checked}
            const lengthcount = orderList.filter(order => nextFilter[order.orderStatus] !== false)
            setCount(lengthcount.length)
            return nextFilter;
        });
}
    




    return (
        <>
        <Navbar/>
        <div className="outer-wrapper">
            <h1 className="main-heading">Orders</h1>
            <div className="inner-wrapper">
                <div className="filter-wrapper">
                    <h3>Filters</h3>
                    <div className="filter-option">
                        <p>Count:{count} <span id="count"></span></p>
                        <label className="filter-checkbox"><input type="checkbox" id="newCheckBox" name="New" onChange={inputhandle} checked={filters.New} />New</label>
                        <label className="filter-checkbox"><input type="checkbox" id="PackedCheckBox" name="Packed" onChange={inputhandle} checked={filters.Packed} />Packed</label>
                        <label className="filter-checkbox"><input type="checkbox" id="IntransitcheckBox" name="InTransit" onChange={inputhandle} checked={filters.InTransit} />InTransit</label>
                        <label className="filter-checkbox"><input type="checkbox" id="DeliveredCheckBox" name="Delivered" onChange={inputhandle} checked={filters.Delivered} />Delivered</label>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <table className="order">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="content-body">
                            {orderList && orderList.filter(order => filters[order.orderStatus] !== false)
                                .map((data) => {
                                    return <tr class="content-row" key={data.id}>
                                        <td class="secondary-text">{data.id}</td>
                                        <td class="primary-text">{data.customerName}</td>
                                        <td class="primary-text">{data.orderDate}<br /><span class="secondary-text">{data.orderTime}</span></td>
                                        <td class="secondary-text">${data.amount}</td>
                                        <td class="primary-text">{data.orderStatus}</td>
                                    </tr>
                                }
                                )}


                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        </>
        
        )
}

export default Order
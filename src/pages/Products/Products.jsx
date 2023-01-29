import React from 'react'
import './Products.css'
import { useState, useEffect } from 'react'
import Navbar from '../../Component/Navbar/Navbar'

const Products = () => {
    const [count, setCount] = useState(0)
    const [productList, setProductList] = useState([])
    const [filteredProductList, setFilteredProductList] = useState([])
    const [filter, setFilter] = useState({
    stock: true,
    expiryDate: true,
    })
    const getData = async () => {
    const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
    const json = await response.json();
    setProductList(json)
    console.log(json)
    setFilteredProductList(json)
    setCount(json.length)
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        filterData(filter, productList)
    }, [filter])
    
    const filterData = (filters, productList) => {
        let filteredList = productList;
        if (!filters.stock) {
            filteredList = filteredList.filter((elm) => elm.stock > 100);
            console.log(filteredList)
        }
        if (!filters.expiryDate) {
            let currentDate = new Date();
            filteredList = filteredList.filter((elm) => new Date(elm.expiryDate) > currentDate);
        }
        setFilteredProductList(filteredList);
        setCount(filteredList.length);
    }
    
    
    const handleInput = (e) => {
        const { name, checked } = e.target
        setFilter({...filter, [name]: checked});
        filterData(filter, productList);
    }


return (
    <>


<Navbar/>
    <div className="outer-wrapper">
        <h1 className="main-heading">Products</h1>
        <div className="inner-wrapper">
            <div className="filter-wrapper">
                <h3>Filters</h3>
                <div className="filter-option">
                    <p>Count:{count} <span id='count'></span></p>
                    <label className="filter-checkbox"><input type="checkbox" name="expiryDate" id="expiredCheckBox" onChange={handleInput} checked={filter.expiryDate} />Expired</label>
                    <label className="filter-checkbox"><input type="checkbox" name="stock" id="lowStockCheckBox" onChange={handleInput} checked={filter.stock} />Low Stock</label>

                </div>
            </div>
            <div style={{ width: '100%' }}>
                <table className="order">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th>Expiry Date</th>
                            <th>Unit Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    <tbody id="content-body">
                    {filteredProductList && filteredProductList
                            .map((data) => {
                                return <tr class="content-row" key={data.id}>
                                    <td class="secondary-text">{data.id}</td>
                                    <td class="primary-text">{data.medicineName}</td>
                                    <td class="secondary-text">{data.medicineBrand}</td>
                                    <td class="primary-text">{data.expiryDate}</td>
                                    <td class="secondary-text">${data.unitPrice}</td>
                                    <td class="secondary-text">{data.stock}</td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
    
)
}

export default Products
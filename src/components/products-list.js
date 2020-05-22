import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './products-list.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { LoremIpsum } from 'lorem-ipsum'
var defaultOrder = []
export default function Products() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        // fetch products
        axios
            .get(`http://localhost:5000/api/products?_page={page}&_limit=20`)
            .then((res) => {
                defaultOrder = [...res.data]
                setProducts(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const [sortBy, setSortBy] = useState('default')
    useEffect(() => {
        if (sortBy == 'default') {
            setProducts(defaultOrder)
        } else {
            setProducts([...products].sort((a, b) => a[sortBy] - b[sortBy]))
        }
    }, [sortBy])

    const [page, setpage] = useState(1)

    const dateFormat = (date) => {
        var formattedDate = new Date(date)
        var now = new Date()
        var dateDiff = Math.round((now - formattedDate) / (1000 * 3600 * 24))
        console.log()
        if (dateDiff > 7) {
            var dd = formattedDate.getDate()
            var mm = formattedDate.getMonth() + 1 //January is 0!
            var yyyy = formattedDate.getFullYear()
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            formattedDate = `${dd}/${mm}/${yyyy}`
            return formattedDate
        } else {
            if (dateDiff == 0) {
                return 'today'
            } else if (dateDiff == 1) {
                return 'yesterday'
            } else {
                return `${dateDiff} days ago`
            }
        }

        // const dateTimeFormat = new Intl.DateTimeFormat('en', {
        //     year: 'numeric',
        //     month: 'short',
        //     day: '2-digit',
        // })
        // const [
        //     { value: month },
        //     ,
        //     { value: day },
        //     ,
        //     { value: year },
        // ] = dateTimeFormat.formatToParts(date)

        // console.log(`${day}-${month}-${year}`)
    }

    const priceFormat = (price) => {
        var formattedPrice = price / 100
        return formattedPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }

    const ProductCard = ({ product }) => {
        const lorem = new LoremIpsum({
            wordsPerSentence: {
                max: 10,
                min: 4,
            },
        })

        return (
            <Card style={{}}>
                <Card.Header className="text-center">
                    size: {product.size}
                </Card.Header>
                <Card.Body className="card-body">
                    <Card.Title
                        style={{ fontSize: product.size, textAlign: 'center' }}
                    >
                        {product.face}
                    </Card.Title>
                    <div>
                        <Card.Text>
                            <li>{lorem.generateSentences(1)}</li>
                            <li>{lorem.generateSentences(1)}</li>
                        </Card.Text>
                        <Card.Text>
                            <b>Price: {priceFormat(product.price)}</b>
                        </Card.Text>
                        <div className="button-container">
                            <Button variant="primary">Find out more!</Button>
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                    {dateFormat(product.date)}
                </Card.Footer>
            </Card>
        )
    }

    return (
        <div>
            <div className="dropdown-container">
                <DropdownButton
                    id="dropdown-button"
                    className="sort-button"
                    title={sortBy}
                    size="lg"
                >
                    <Dropdown.Item onClick={() => setSortBy('default')}>
                        default
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy('size')}>
                        size
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy('price')}>
                        price
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy('id')}>
                        id
                    </Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="products-list">
                {products.map((product) => {
                    return <ProductCard key={product.id} product={product} />
                })}
            </div>
        </div>
    )
}

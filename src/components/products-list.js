import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './products-list.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { LoremIpsum } from 'lorem-ipsum'
var defaultOrder = []
export default function Products() {
    // products list and its ref
    const [products, setProducts] = useState([])
    const productsRef = useRef(products)
    useEffect(() => {
        // update productsRef when product changes
        productsRef.current = products
    }, [products])
    // page counter and its ref
    const [page, setpage] = useState(0)
    const pageRef = useRef(page)
    useEffect(() => {
        // update pageRef when page changes
        pageRef.current = page
    }, [page])

    // loading state
    const [loading, setloading] = useState(false)

    const [sortBy, setSortBy] = useState('default')
    useEffect(() => {
        if (sortBy === 'default') {
            setProducts(defaultOrder)
        } else {
            setProducts(
                [...productsRef.current].sort((a, b) => a[sortBy] - b[sortBy])
            )
        }
    }, [sortBy])

    // initialize observer
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const observedElement = entries[0]
                if (observedElement.isIntersecting) {
                    getProduct()
                }
            },
            { threshold: 1 }
        )
    )
    // element state to be observered
    const [element, setElement] = useState(null)
    useEffect(() => {
        const currentElement = element
        const currentObserver = observer.current
        if (currentElement) {
            currentObserver.observe(currentElement)
        }
        return () => {
            // cleanup observer when unmount component
            if (currentElement) {
                currentObserver.unobserve(currentElement)
            }
        }
    }, [element])

    const getProduct = () => {
        console.log(`getting data on page: ${pageRef.current + 1}`)
        // fetch products
        setloading(true)
        axios
            .get(
                `http://localhost:5000/api/products?_page=${
                    pageRef.current + 1
                }&_limit=20`
            )
            .then((res) => {
                setloading(false)
                defaultOrder = [...defaultOrder, ...res.data]
                setProducts([...productsRef.current, ...res.data])
                setpage(pageRef.current + 1)
            })
            .catch((err) => console.log(err))
    }

    const dateFormat = (date) => {
        // format the date
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
            if (dateDiff === 0) {
                return 'today'
            } else if (dateDiff === 1) {
                return 'yesterday'
            } else {
                return `${dateDiff} days ago`
            }
        }
    }

    const priceFormat = (price) => {
        // price format to cents
        var formattedPrice = price / 100
        return formattedPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }

    const ProductCard = ({ product }) => {
        // individual product
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

    // rendering component
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
                {products.map((product, i) => {
                    return <ProductCard key={product.id} product={product} />
                })}
            </div>
            {products.length !== 500 && <div ref={setElement}>loading... </div>}
        </div>
    )
}

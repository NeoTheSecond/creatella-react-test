import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './products-list.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { LoremIpsum } from 'lorem-ipsum'
export default function Products() {
    const [products, setProducts] = useState([])
    const [page, setpage] = useState(1)

    useEffect(() => {
        // fetch products
        axios
            .get(`http://localhost:5000/api/products?_page={page}&_limit=20`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
    }, [])

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
                            <b>Price: ${product.price}</b>
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
        <div className="products-list">
            {products.map((product) => {
                return <ProductCard key={product.id} product={product} />
            })}
        </div>
    )
}

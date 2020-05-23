import React, { useState, useEffect } from 'react'

const List = () => {
    const [listItems, setListItems] = useState(
        Array.from(Array(30).keys(), (n) => n + 1)
    )
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: '10px',
            threshold: 1.0,
        }
    }, [])

    useEffect(() => {
        if (!isFetching) return
        fetchMoreListItems()
    }, [isFetching])

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isFetching
        )
            return
        setIsFetching(true)
    }

    function fetchMoreListItems() {
        setTimeout(() => {
            setListItems((prevState) => [
                ...prevState,
                ...Array.from(
                    Array(20).keys(),
                    (n) => n + prevState.length + 1
                ),
            ])
            setIsFetching(false)
        }, 2000)
    }

    return (
        <>
            <ul className="list-group mb-2">
                {listItems.map((listItem, i) => (
                    <li className="list-group-item" key={i}>
                        List Item {listItem}
                    </li>
                ))}
            </ul>
            {isFetching && 'Fetching more list items...'}
        </>
    )
}

export default List

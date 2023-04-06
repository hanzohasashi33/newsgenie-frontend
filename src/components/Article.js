import React from "react";
import {useParams} from "react-router-dom"

const Article = (props) => {

    const {id} = useParams();

    return <h1>Article View - {id}</h1>
}


export default Article;
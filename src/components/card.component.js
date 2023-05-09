import React,{useState} from "react";

/**
 *
 * @param {Object} props
 * @param {Number} props.id
 * @param {String} props.thumbnail
 * @param {String} props.title
 * @param {String} props.description
 * @param {(Node|ChildNode)} props.children
 * @returns {JSX.Element}
 * @constructor
 */
export default function CardComponent(props){
    let {
        children,
        id,
        title,
        thumbnail,
        description
    } = props

    const [ loading , setLoading] =
        useState(false);
    function addToCart(){
        // call service / API
        setLoading(true)
        setTimeout(()=> {
            setLoading(false);
        },2000)
        clearTimeout();

    }
    return (
        <section
            className={
            'w-auto min-w-[200px] bg-white rounded-xl app-card'
        }>
            {/**thumbnail*/}
            <div className={'app-card-img'}>
                <img
                    src={thumbnail}
                    alt="thumbnail-card"
                    className={'card-img__images'}
                />
            </div>

            {/**children-component**/}
            {props?.children}

            {/**content*/}
            <div className={'p-4 w-full'}>
                <h3 className={'text-black'}>{title}</h3>
                <p className={'text-black'}>{description}</p>
                <div>
                    <button
                        onClick={addToCart}
                        className={'text-black'}
                    >
                        {loading ? "Loading" :"Add to cart"}
                    </button>
                </div>
            </div>
        </section>
    )
}
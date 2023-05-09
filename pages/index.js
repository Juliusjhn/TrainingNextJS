import axios from "axios";

/**
 *
 * @param {Object} props
 * @param {Array} props.data
 * @returns {JSX.Element}
 * @constructor
 */
export default function Home(props){
    console.log(props.data);
  return (
      <div className={'h-screen w-full bg-white bg-fixed '}>
        <h1>Home</h1>
          <div className={'mx-auto max-w-[900px] flex flex-col'}>
              {
                  props.data.map((item)=> {
                      return (
                          <div className={'text-black bg-gray-100 rounded-xl mb-4 flex flex-col'}>
                             <p>ID = {item.id}</p>
                             {/*<p>userID = {item.userId}</p>*/}
                             {/*<p>Title = {item.title}</p>*/}
                             {/*<p>Body = {item.body}</p>*/}
                          </div>
                      )
                  })
              }
          </div>
      </div>
  )
}
//
// export async function getStaticPaths(){
//
// }
// export async function getStaticProps(ctx){
//     return {
//         props : {
//             data: []
//         }
//     }
// }

export async function getServerSideProps(ctx){
    let query = ctx.query;
    let params = {
        page:1,
        limit:10,
    }
    if(
        typeof(query?.page)
        !== 'undefined' &&
        query?.page !== "" &&
        query?.page !== null
    ){
        Reflect.set(
            params,
            'page',
            query?.page
        )
    }

    // call service / API
    // const data = [
    //     {
    //         id:1,
    //         content: "Lorem ipsum dolor sit amet"
    //     },
    //     {
    //         id:2,
    //         content: "Lorem ipsum dolor sit amet"
    //     }
    // ]

    const response = await axios
        .get("https://jsonplaceholder.typicode.com/posts", {
            params:{
                ...params,
            }
        })
        .then((res)=> {
            return res.data;
        })
        .catch((err)=> {
            return [];
        });

    return {
        props: {
            data: response
            // data:data
        }
    }
}
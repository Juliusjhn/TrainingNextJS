import axios from "axios";
import CardComponent from "@app/src/components/card.component";

export default function Home(props){
  return (
      <div className={'h-screen w-full bg-white bg-fixed '}>
        <h1>Home</h1>
          {/*<div className={'mx-auto max-w-[900px] flex flex-col'}>*/}
          {/*    {*/}
          {/*        props.data.map((item)=> {*/}
          {/*            return (*/}
          {/*                <div className={'text-black bg-gray-100 rounded-xl mb-4 flex flex-col'}>*/}
          {/*                   <p>ID = {item.id}</p>*/}
          {/*                   /!*<p>userID = {item.userId}</p>*!/*/}
          {/*                   /!*<p>Title = {item.title}</p>*!/*/}
          {/*                   /!*<p>Body = {item.body}</p>*!/*/}
          {/*                </div>*/}
          {/*            )*/}
          {/*        })*/}
          {/*    }*/}
          {/*</div>*/}
          <CardComponent
              id={2}
              thumbnail={'/google-logo-lg.png'}
              title={'Ini Title custom children'}
              description={'Ini deskripsinya'}
          >
              <div>
                  <h4 className={'text-black'}>ini custom children</h4>
              </div>
          </CardComponent>


          <CardComponent
              id={1}
              thumbnail={'/google-logo.png'}
              title={'Ini Title'}
              description={'Ini deskripsinya'}
          />


      </div>
  )
}


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
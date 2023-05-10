import '@app/styles/globals.css'

import "@app/styles/sass/main.scss"
import Navbar from "@app/src/components/navbar";
import {getSession, SessionProvider} from "next-auth/react";

export default function App(props) {
    let { Component, pageProps: {session,...pageProps} } = props
    return (
        <SessionProvider session={session}>
            <div
                className={
                    'app-main bg-fixed bg-white w-full min-h-screen'
                }>
                <Navbar logo={'/google-logo.png'}/>
                <main className={'pt-20'}>
                    <Component {...pageProps} session={session}/>
                </main>

            </div>
        </SessionProvider>
    )
}


App.getInitialProps = async ({Component,ctx})=> {
    let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const session = await getSession(ctx);

    pageProps = {
        ...pageProps,
        session
    }
    return {
        pageProps
    }
}
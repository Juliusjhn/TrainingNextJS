import '@app/styles/globals.css'

import "@app/styles/sass/main.scss"
import Navbar from "@app/src/components/navbar";

export default function App({ Component, pageProps }) {
    return (
        <div
            className={
            'app-main bg-fixed bg-white w-full min-h-screen'
        }>
            <Navbar logo={'/google-logo.png'}/>
            <main className={'pt-20'}>
                <Component {...pageProps} />
            </main>

        </div>
    )
}

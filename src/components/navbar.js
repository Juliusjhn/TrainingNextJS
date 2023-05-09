
/**
 * @param {Object} props
 * @param {(String|null)} props.logo
 */
export default function Navbar(props){
    let { logo } = props
    return (
        <header
            className={
            'w-full fixed top-0 h-20 bg-white'
            }
        >
            <div className="mx-auto max-w-[1280px]">
                <div>
                    {
                        logo !== null &&
                        <img
                            src={logo}
                            alt="logo-page"
                            className={'w-20 object-contain'}
                        />
                    }
                    <nav>
                        <ul className={'flex items-center gap-4'}>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/about">About</a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
};


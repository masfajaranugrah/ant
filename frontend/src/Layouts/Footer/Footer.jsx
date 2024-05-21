import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <section className="dark:bg-black bg-gray-300">
            <div className="flex flex-col justify-around items-center relative b-0">
                <div>
                    <p>© 2024. All rights reserved. by <Link>Library</Link></p>
                </div>
                <div className="flex gap-3">
                    <div>
                    <Link to={'/'}>
                    Privacy Policy
                    </Link>
                    </div>
                    <div>
                    <Link>
                        Diclaimer
                    </Link>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default Footer;
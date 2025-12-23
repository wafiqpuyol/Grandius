import { Link } from "react-router-dom";
import SignOutButton from "./Signout";

const Header = () => {
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Gradious</Link>
                </span>
                <span className="flex gap-5">
                    <Link
                        className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                        to="/my-bookings"
                    >
                        My Bookings
                    </Link>
                    <Link
                        className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                        to="/my-hotels"
                    >
                        My Hotels
                    </Link>
                    <Link to="/signup" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100">Register</Link>
                    <Link to="/signin" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100">Sign in</Link>
                    <SignOutButton />
                </span>
            </div>
        </div>
    )
}

export default Header
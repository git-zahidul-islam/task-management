import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex gap-5 bg-gray-400">
            <Link href={'/'}>Home</Link>
            <Link href={'/'}>Complete Task</Link>
        </nav>
    );
};

export default Navbar;
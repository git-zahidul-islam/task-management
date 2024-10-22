import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex gap-5 bg-gray-400 lg:w-[50%] md:w-[75%] w-[95%] mx-auto">
            <Link href={'/'}>Home</Link>
            <Link href={'/all-task'}>All Task</Link>
            <Link href={'/bookmark'}>Complete Task</Link>
            <Link href={'/'}>Complete Task</Link>
        </nav>
    );
};

export default Navbar;
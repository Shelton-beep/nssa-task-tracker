import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.png";
//import localFont from 'next/font/local'
//import {cn} from '@/lib/utils'

/** 
const headingFont = localFont({
  src: "../public/font.woff2",
});*/

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src={logo} alt="Logo" height={30} width={30} priority />
        {/** <p className={(cn"text-lg text-neutral-700 pb-1", headingFont.className)}>Nssa Taskit</p>  */}
        <p className="text-lg text-neutral-700 pb-1">
          Nssa Task<span className="italic text-amber-700">it.</span>
        </p>
      </div>
    </Link>
  );
};

export default Logo;

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router, { useRouter, withRouter } from 'next/router';
import Image from 'next/image';
import Logo from "../logo.png"
import { checkAndGetPolygonAddress } from '../utilities/utils';
import { createDDWAdsWriteContract } from '../utilities/writeContract';

const Navbar = (props) => {

    const [nav, setNav] = useState(false);
    const [shadow, setShadow] = useState(false);
    const [navBg, setNavBg] = useState('#ecf0f3');
    const [linkColor, setLinkColor] = useState('#ecf0f3');
    const router = useRouter();

    useEffect(() => {
        if (
            router.asPath === '/new'
        ) {
            setNavBg('#ecf0f3');
            setLinkColor('#ecf0f3');
        } else {
            setNavBg('#ecf0f3');
            setLinkColor('#ecf0f3');
        }


    }, [router]);

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        const handleShadow = () => {
            if (window.scrollY >= 90) {
                setShadow(true);
            } else {
                setShadow(false);
            }
        };
        window.addEventListener('scroll', handleShadow);
    }, []);

    async function checkListing() {
        var address = await checkAndGetPolygonAddress();
        var Contract = createDDWAdsWriteContract();
        var data = await Contract.view_listing_names();
        if(data.length === 0)
        {
            alert("You don't have any listings!");
            return;
        }
        else{
            router.push("/new");
        }    
    }

    return (
        <div
            style={{ backgroundColor: `${navBg}` }}
            className={
                shadow
                    ? "fixed w-full h-20  shadow-3xl z-[100]"
                    : "fixed w-full h-20  z-[100]"
            }
        >
            <div className='  items-center'>

                <div className='absolute   mx-10  items-center uppercase  w-full  '>

                    <div className='relative top-6  mx-10  items-center uppercase  w-full '>
                        <ul style={{ color: `${linkColor}` }} className='justify-start grid-cols-3 hidden md:flex'> 
                            <div className='relative bottom-4 flex justify-center items-center'>
                                <Image src={Logo} height="80" width="80"></Image>
                            </div>                            
                        </ul>
                    </div>

                </div>

                <div className='grid md:grid-cols-2 absolute ml-2 right-2 text-center bottom-5 '>
                        <div className=' text-sm uppercase '>
                            <button className='p-2 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 shadow-none text-white underline-offset-auto' onClick={checkListing} >
                                Check Existing Listing
                            </button>


                        </div>
                </div>

            </div>
        </div>

    );
};

export default withRouter(Navbar);


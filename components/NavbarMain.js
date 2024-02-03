'use client'
import {React, Fragment} from 'react'
import { Menu, Transition } from "@headlessui/react";
const NavbarMain = () => {

    const imageUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'ResetPassword', href: '/reset-password' },
        { name: 'Sign out', href: '/signout' },
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const name = localStorage.getItem('username').replace(/['"]+/g, '').split(' ')[0];
    return (
        <>
            <div className='bg-white top-0 w-screen h-fit shadow-md text-[#012970] text-xl p-3 font-bold flex justify-between '>
                <div>
                    <span className=' font-extrabold'>EDU</span>sync
                </div>
                <div className=''>
                <Menu as="div" className=" relative ml-3 mr-3 flex  justify-center content-center place-items-center gap-2 ">
                <p className=' text-sm text-slate-900 font-medium'>{name}</p>
                    <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={imageUrl} alt="" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute origin-right top-0 right-0 z-10 mt-10 w-48  rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-medium text-slate-900">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                   
                </Menu>
                </div>
            </div>
        </>
    )
}

export default NavbarMain
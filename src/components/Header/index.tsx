import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut, FiMenu } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

interface IWindowsSize {
    width: number;
    height: number;
}

export function Header() {
    const headData = [{
        name: 'test',
        link: '/test'
    },
    {
        name: 'test',
        link: '/test'
    },
    {
        name: 'test',
        link: '/test'
    }]
    const { signOut } = useContext(AuthContext)
    const [windowSize, setWindowSize] = useState<IWindowsSize>({
        height: 0,
        width: 0,
    });
    const [menu, setMenu] = useState<boolean>(false)


    function handleMenu() {
        setMenu(!menu)
    }

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="./logo.svg" width={190} height={60} />
                </Link>

                {windowSize.width > 768 ? (
                    <>
                        {menu ? setMenu(false) : null}
                        <nav className={styles.menuNav}>

                            {
                                headData.map((item, index) => (
                                    <Link key={index} href={item.link}>
                                        <a>{item.name}</a>
                                    </Link>
                                ))
                            }
                            <button onClick={signOut}>
                                <FiLogOut color="#3C3A3B" size={24} />
                            </button>
                        </nav>
                    </>
                ) : (
                    <>
                        <FiMenu onClick={handleMenu} color="#3C3A3B" size={25} />
                    </>
                )}
            </div>
            {menu !== false ? (
                <nav className={styles.menuMobile}>
                    <ul>
                        {headData.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link}>
                                    <a>{item.name}</a>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a onClick={signOut}>
                                Sair
                            </a>
                        </li>
                    </ul>
                </nav>
            ) : null
            }
        </header >
    )
}
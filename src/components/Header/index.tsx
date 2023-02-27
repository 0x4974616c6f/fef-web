import Link from "next/link";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./styles.module.scss";

import { FiLogOut, FiMenu } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";

import { AuthContext } from "../../contexts/AuthContext";

interface IWindowsSize {
  width: number;
  height: number;
}

interface IHeadData {
  changeMenuActive: () => void;
}

export function Header({ changeMenuActive }: IHeadData) {
  const headData = [
    {
      name: "Tarefas",
      link: "/dashboard",
    },
    {
      name: "Funcionários",
      link: "/funcionarios",
    },
  ];
  const { signOut } = useContext(AuthContext);

  const [windowSize, setWindowSize] = useState<IWindowsSize>({
    height: 0,
    width: 0,
  });
  const [menu, setMenu] = useState<boolean>(false);

  function handleMenu() {
    changeMenuActive();
    setMenu(!menu);
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
  }, []);

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
  }, []);

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
              {headData.map((item, index) => (
                <Link key={index} href={item.link}>
                  <a>{item.name}</a>
                </Link>
              ))}
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
        <div className={styles.fullScreen}>
          <GiCancel
            className={styles.cancelaButton}
            onClick={handleMenu}
            size={30}
            color={"#ff0000"}
          />
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
                <a onClick={signOut}>Sair</a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

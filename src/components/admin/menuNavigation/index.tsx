import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { MdDashboard, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import s from "./styles.module.scss";
import { useRouter } from "next/router";

const sidebarItem = [
  { name: "Home", href: "/", icon: AiOutlineHome },
  {
    name: "Dashboard",
    href: "/admin",
    icon: MdDashboard,
  },
  {
    name: "Monetário",
    href: "/admin/money",
    icon: RiMoneyDollarCircleLine,
  },
  {
    name: "Emails",
    href: "/admin/emails",
    icon: FiMail,
  },
  {
    name: "Contatos",
    href: "/admin/contatos",
    icon: TiContacts,
  },
];

const Navigation = () => {
  const { isCoollapsedSidebar, toggleSidebarCollapsedHandler } =
    useContext(SidebarContext);

  const router = useRouter();
  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <div className={s.sidebar_wrapper}>
      <button className={s.btn} onClick={toggleSidebarCollapsedHandler}>
        <MdOutlineKeyboardArrowLeft />
      </button>
      <aside className={s.sidebar} data-collapse={isCoollapsedSidebar}>
        <div className={s.sidebar__top}>
          <Image
            src="/admin.png"
            width={60}
            height={60}
            className={s.sidebar__logo}
          />
          <p className={s.sidebar__logo_name}>Ferrinox Admin</p>
        </div>
        <ul className={s.sidebar__list}>
          {sidebarItem.map(({ href, icon: Icon, name }) => (
            <li className={s.sidebar__item} key={name}>
              <Link href={href}>
                <div className={s.sidebar__link}>
                  <span className={s.sidebar__icon}>
                    <Icon />
                  </span>
                  <span className={s.sidebar__name}>{name}</span>
                </div>
              </Link>
            </li>
          ))}
          <li className={s.sidebar__item}>
            <div className={s.sidebar__link} onClick={goToHomePage}>
              <span className={s.sidebar__icon}>
                <AiOutlineLogout />
              </span>
              <span className={s.sidebar__name}>Sair</span>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Navigation;

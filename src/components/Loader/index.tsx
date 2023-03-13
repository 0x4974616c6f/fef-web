import s from "./styles.module.scss";

const Loader = () => (
  <div className={s.loader}>
    <div className={s.loader__spinner}></div>
  </div>
);

export default Loader;

import style from "./index.module.less";
export default function () {
  return (
    <div className={style.welcome}>
      <div className={style.content}>
        <div className={style.title}>欢迎</div>
        <div className={style.subtitle}>后台通用管理后台系统</div>
      </div>
      <div className={style.img}></div>
    </div>
  )
}

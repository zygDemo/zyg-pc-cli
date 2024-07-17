// 定义防止重复点击的指令
export const preventReClick = {
  created(el, binding, vnode, prevVnode) {
    el.addEventListener("click", (e) => customClick(e, binding, el));
  },
  // 离开一定要销毁卸载
  unmounted(el, binding, vnode) {
    el.removeEventListener("click", customClick);
  },
};
// 逻辑封装
const customClick = (e, binding, el) => {
  //阻止事件冒泡
  e.stopPropagation();
  if (!el.disabled) {
    // 判断条件
    el.disabled = true;
    setTimeout(() => {
      el.disabled = false;
    }, binding.arg || 1500);
    // 正常触发点击事件
    // binding.value();
  } else {
    // 已经成功拦截点击事件
    console.log("已经成功拦截点击事件");
  }
};
//指令抛出
export const setupAuthDirective = (app) => {
  app.directive("click", preventReClick);
};

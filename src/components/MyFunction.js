import Child from './Child';
import Counter from './Counter';
import HelloWorld from './HelloWorld';
function chooseComponent(type) {
  if (type === '1') return Child;
  if (type === '2') return Counter;
  return HelloWorld;
}

export default {
  name: 'CustomFunctional',
  functional: true,// 功能性组件没有实例，所以render中是不能访问this的
  props: {
    type: {
      type: String,
      default: '1'
    }
  },
  // 更新响应式属性的时候，会执行_render方法，生成对应的虚拟节点，然后_update进行diff对比后，patch更新
  render(createElement, context) {
    // 把render理解成template，因为template最终会转换成这个render函数，返回虚拟节点
    console.log('render');
    // createElement返回VNode
    // 每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。
    const { props, children, slots, data, parent, listeners } = context;
    const name = parent.$lj.name; // 这里访问了这个响应式的属性，这个响应式属性改变后，该render函数式函数会触发
    data.myRouter = true;
    let type = '1';
    if (name < 0.3) {
      type = '1';
    } else if (name > 0.3 && name < 0.7) {
      type = '2';
    } else {
      type = '3';
    }
    const renderVNode = chooseComponent(type);
    return  parent.$createElement(renderVNode, data, children);
  }
};

# myReact
react实现原理

## ReactDOM.render 

```js
//作用将标记放入容器
function render(element,container){
    let instance = createReactUnit(element)
    let markUp = instance.markUp(react.rootId)
    $(container).html(markUp)
    $(document).trigger('mounted')
}
```

## React.createElement

```js
//构建虚拟Dom
class Element {
   constructor(type,props){
       this.type = type
       this.props = props
   }
}

function createElement(type,props={},...children){
    props.children = children
    return new Element(type,props)
}
```
## React.Unit

```js
//判断虚拟dom节点类型
function createReactUnit(element){
    if(typeof element == 'string' || typeof element == 'number'){
        return new TextUnit(element)
    }
    if(typeof element == 'object' && typeof element.type == 'string'){
        return new Native(element)
    }
    if(typeof element == 'object' && typeof element.type == 'function'){
        return new Composite(element)
    }
}
```
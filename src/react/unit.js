import $ from 'jquery'

class Unit {
    constructor(element){
        this.currentElement = element
    }
}

class TextUnit extends Unit {
    markUp(rootId){
        this._rootId = rootId
        return `<span react-id='${rootId}'>${this.currentElement}</span>`
    }
}

class Native extends Unit {
    markUp(rootId){
        this._rootId = rootId
        let {type,props} = this.currentElement
        let startTag = `<${type} react-id='${rootId}'`
        let content 
        let endTag = `</${type}>`

        Object.keys(props).forEach((propsName) => {
            if(/on[A-Za-z]/.test(propsName)){
                let eventType = propsName.substring(2).toLowerCase()
                $(document).on(eventType,`[react-id='${rootId}']`,props[propsName])
            } else if(propsName === 'children'){
                content = props[propsName].map((child,idx) => {
                    let instance = createReactUnit(child)
                    return instance.markUp(`${rootId}.${idx}`)
                }).join('')    
            } else {
                startTag += `${propsName}='${props[propsName]}'`
            }
        })

        return startTag + '>' + content + endTag
    }
}

class Composite extends Unit {
    markUp(rootId){
        this._rootId = rootId
        let {type:Component,props} = this.currentElement
        let instance = new Component(props)
        instance.componentWillMount &&  instance.componentWillMount()
        let renderer = instance.render()
        let redererInstance = createReactUnit(renderer)
        let markUp = redererInstance.markUp(rootId)

        $(document).on('mounted',() => {
            instance.componentDidMount && instance.componentDidMount()
        })

        return markUp
    }
}


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

export default createReactUnit
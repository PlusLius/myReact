import $ from 'jquery'
import createElement from './element'
import createReactUnit from './unit'
import Component from './component'

let react = {
    render,
    rootId:0,
    createElement,
    Component
}

function render(element,container){
    let instance = createReactUnit(element)
    let markUp = instance.markUp(react.rootId)
    $(container).html(markUp)
    $(document).trigger('mounted')
}

export default react
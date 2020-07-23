/**
 * Anime un titre avec un effet d'apparition mot par mot
 * 
 * @param {string} selector 
 */
function animateTitle(selector) {
    const title = document.querySelector(selector)
    if (title == null) {
        console.error('Impossible de trouver l\'élément' + selector)
        return
    }

    const spans = spanify(title)

    spans.forEach((span, k) => {
        span.children[0].style.animationDelay = (k * .2) + 's'
    })
}

/**
 * Entoure chaque mot d'une <span> (récursivement)
 * 
 * @param {Node} element 
 * @return {HTMLSpanElement[]}
 */
function spanify (element){
        //Construit un tableau contenant la nouvelle structure
        const children = Array.from(element.childNodes)
        let spans = []
        let elements =[]
        children.forEach(child => {
            if (child.nodeType == Node.TEXT_NODE){
                const words = child.textContent.split(' ')
                let wordSpans = words.map(wrapWord)
                spans = spans.concat(wordSpans)
                
                elements = elements.concat(
                    injectElementBetweenItems(wordSpans, document.createTextNode(' '))
                )
            }else if (child.tagName== 'BR') {
                elements.push(child)
            } else {
                spans = spans.concat(spanify(child))
                elements.push(child)
            }
        })
        console.log(elements)
    
        //Utilisation de ce tableau et injecte les éléments dans title
        element.innerHTML = ''
        elements.forEach(el => {
            element.appendChild(el)
        })
    return spans
}

/**
 * Entoure le mot de 2 <span>
 * 
 * @param {string} word 
 */
function wrapWord (word){
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    span.appendChild(span2)
    span2.innerHTML = word
    return span
}

/**
 * 
 * @param {HTMLElement} arr 
 * @param {Node} element à injécter entre chaque element du tableau
 * @return {Node[]}
 */
function injectElementBetweenItems(arr, element){
    return arr.map((item, k )=> {
        if (k == arr.length -1) {
            return [item]
        }
        return [item, element.cloneNode()]
    }).reduce((acc, pair) => {
        acc = acc.concat(pair)
        return acc
    }, [])
}
animateTitle('.title')
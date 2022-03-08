module.exports = function (msg){

    const banWords = [
        'quloq', 'qulo', 'qulо', 'qulоq', 'Кулок', 'кулок'
    ]

    const a = banWords.map(word => {
        const regex1 = new RegExp(`${word} (.+)`)
        const regex2 = new RegExp(`${word}(.+)`)

        if(!msg.text){
            return false
        }
    
        let newWord = msg.text.replace(/[^a-zа-яё]/gi, '').split('')
        newWord = Array.from(new Set(newWord))
    
        let arr = newWord.map(item => {
          return  item.toString().toLowerCase()
        })
    
        arr = Array.from(new Set(arr))
    
        arr = arr.join('')
    
        let newQuloq = arr.split('').join(' ')
    
        if(newQuloq && newQuloq.includes(word)){
            return true
        }
    
    
        return (msg.text.toLowerCase() === word ||
                regex1.test(msg.text.toLowerCase()) ||
                regex2.test(msg.text.toLowerCase()) ||
                arr === word ||
                regex1.test(arr) ||
                regex2.test(arr) 
        )
    })

    if(a.length < 1){
        return false
    }

    const newArrays = a.filter(item => item === true)

    if(newArrays.length < 1){
        return false
    }

    return true

    // const regex1 = new RegExp(`qulo (.+)`)
    // const regex2 = new RegExp(`quloq (.+)`)
    // const regex3 = new RegExp(`qulo(.+)`)
    // const regex4 = new RegExp(`quloq(.+)`)

   
}
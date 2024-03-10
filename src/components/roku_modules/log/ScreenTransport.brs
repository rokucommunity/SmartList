' /**
'  * @module LogScreenTransport
'  * @description implementation of mLog screen transport
'  */
function init()
    m.displayedLines = []
    m.scrollableText = m.top.findNode("scrollableText")
end function

function logItem(name, levelNum, text)
    m.displayedLines.push(left(text, 100))
    if m.displayedLines.count() > m.top.maxVisibleLines
        m.displayedLines.delete(0)
    end if
    m.scrollableText.text = m.displayedLines.join(chr(10))
end function'//# sourceMappingURL=./ScreenTransport.bs.map
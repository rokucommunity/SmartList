# SmartList Component Documentation

The SmartList component provides a flexible way to display lists of items with customizable item components and efficient management of item visibility and focus.

## Getting Started

To create a SmartList component, follow these steps:

1. Define the SmartList component in your BrightScript code.
2. Configure the desired fields to customize the behavior and appearance of the list.
3. Create and assign an XML component for the items within the list.

## Fields

### Core Fields

- [itemComponentName](list-item-component.md) (string): Specifies the name of an XML component for the items in each row.
- `itemContent` (ContentNode): Contains the data to be displayed by the row list item.

### [List Configuration](list-fields.md)

### Managers

- [`Item Scroller Manager`](ItemScrollManager.md): Handles scrolling of items within the list.
- [`View Manager`](ItemViewManager.md): Manages item visibility based on the current scroll position.
- [`Focus Manager`](FocusManager.md): Manages focus behavior within the list.
- [`Content Manager`](ContentManager.md): Manages content within the list

### Example

```brightscript
' Create a new instance of the SmartList
smartList = CreateObject("roSGNode", "SmartList")

' Set up fields for the SmartList
    ' Set up the content node for the SmartList
    contentNode = CreateObject("roSGNode", "ContentNode")
    ' Add row nodes to the content node
        For i = 0 To 4
            rowNode = CreateObject("roSGNode", "ContentNode")
            rowNode.AddFields({TITLE: "Row " + Str(i + 1)})
            contentNode.AddChild(rowNode)
        Next

        ' Add item nodes to each row node
        For Each rowNode In contentNode.GetChildNodes()
            For i = 0 To 9
                itemNode = CreateObject("roSGNode", "ContentNode")
                itemNode.AddFields({
                    FHDPOSTERURL: "http://example.com/image" + Str(i) + "_FHD.jpg",
                    HDPOSTERURL: "http://example.com/image" + Str(i) + "_HD.jpg",
                    SDPOSTERURL: "http://example.com/image" + Str(i) + "_SD.jpg",
                    FHDItemWidth: 100,
                    HDItemWidth: 120,
                    SDItemWidth: 80
                })
                rowNode.AddChild(itemNode)
            Next
        Next

    fields = {
        itemSize: { width: 100, height: 50 },
        numRows: 5,
        rowHeights: [150, 200, 100, 180, 160]
        rowItemSizeP [[100, 100], [120, 120], [80, 80], [110, 110], [90, 90]]
        rowSpacings: [10, 20, 15, 5, 10] ' Spacing after each row
        itemComponentName: "ListItemComponent"
        rowTitleComponentName: "RowTitleComponent"
        rowLabelOffset: [[10, 0], [15, 0], [5, 0], [12, 0], [8, 0]]
        showRowLabel: [true, true, true, true, true]
        content: contentNode
    }

      ' Set fields on row list component
        smartList.setFields(fields)
```

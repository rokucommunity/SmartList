# ListItemComponent.brs

The `ListItemComponent` class represents the individual items displayed within a list component. It observes changes to the `itemContent` field to dynamically update the appearance of each item based on the content provided.

## Fields

- **itemContent** (Object): Contains the data to be displayed by the list item. Changes to this field trigger updates to the visual elements of the item.

## Methods

- **init()**: Initializes the `ListItemComponent` instance by observing changes to the `itemContent` field.

```
    public function init()
        ' Observe the itemContent field
        m.top.observeField("itemContent", "onItemContentChange")
    end function
```

- **onItemContentChange()**: Callback function triggered when the `itemContent` field changes. Updates the visual elements of the list item based on the new content.

````
public function onItemContentChange()
        ' Update visual elements based on new item content
        poster.uri = m.top.itemContent.uri
        titleLabel.text = m.top.itemContent.title
    end function
    ```
````

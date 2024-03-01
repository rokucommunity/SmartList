# SmartList Class Documentation

## Overview

The `SmartList` class is a component responsible for managing a list with dynamic loading of additional rows. It utilizes a callback function to load more rows when necessary, making it suitable for scenarios where the list content is dynamically fetched from a remote data source.

## Constructor

```brightscript
function init(loadMoreRowsCallback as Function)
```

### Description:

Initializes the SmartList component.
Initializes the necessary managers and variables.
Sets up the callback function for loading more rows.

## Methods

### setFields(fields as Object, options as Object = invalid)

#### Description:

Sets the fields of the list component with customization options.
Passes field values to the RowListManager.
Applies customization options such as enabling animation to the ItemScrollerManager.

#### Parameters:

- `fields` (Object): An object containing field values for customizing the list.
- `options` (Object, optional): An object containing customization options for the list. Default is invalid.

### Example

```brightscript

class SmartList
    ' Constructor

    private itemScroller
    private itemViewManager
    private contentManager

    function init()
        ' Initialize managers
        m.itemScrollerManager = new ItemScrollerManager()
        m.itemViewManager = new ItemViewManager()
        m.contentManager = new ContentManager()
    end function

    ' Method to set row list fields with customization options
    function setFields(fields as Object, options as Object = invalid)
        m.itemScrollerManager.setFields(fields, options)
        m.itemViewManager.setFields(fields, options)
        m.contentManager.setContent(fields.content)
    end function
```

# Item View Manager

The `ItemViewManager` is responsible for managing the visual presentation of items within the `SmartList`. It handles the rendering of item components, updating their appearance based on data changes, and maintaining consistency in item layout.

Responsibilities include:

- Rendering item components based on data.
- Updating item appearance in response to data changes.
- Maintaining consistency in item layout across different screen resolutions.

### Methods:

1. **updateItem(rowIndex as Integer, itemIndex as Integer, data as Object)**

   - Parameters:
     - `rowIndex` (Integer): The index of the row containing the item to be updated.
     - `itemIndex` (Integer): The index of the item to be updated within the row.
     - `data` (Object): The updated data for the item.
   - Description: Updates the visual representation of the specified item with the provided data.

2. **addItem(rowIndex as Integer, itemIndex as Integer, data as Object)**

   - Parameters:
     - `rowIndex` (Integer): The index of the row where the new item will be added.
     - `itemIndex` (Integer): The index at which the new item will be inserted within the row.
     - `data` (Object): The data for the new item.
   - Description: Adds a new item to the specified location in the list.

3. **removeItem(rowIndex as Integer, itemIndex as Integer)**

   - Parameters:
     - `rowIndex` (Integer): The index of the row containing the item to be removed.
     - `itemIndex` (Integer): The index of the item to be removed within the row.
   - Description: Removes the specified item from the list.

4. **clearItems()**

   - Description: Clears all items from the list.

5. **refresh()**

   - Description: Refreshes the visual representation of all items in the list.

6. **handleKeyPress(keyCode as Integer)**

   - Parameters:
     - `keyCode` (Integer): The code of the pressed key.
   - Description: Handles key presses within the list and updates the focus accordingly.

7. **setFields(fields as Object, options as options)**
   - Parameters:
     - `fields` (Object): Object containg fields from the row list
     - `options` (Object): Object containg additional options
   - Description: Sets corresponding fields and additional options

### List Configuration

- `rowTitleComponentName` (string): Specifies the name of an XML component to render titles in place of the row label.
- `content` (ContentNode): Specifies the content for the list.
- `itemSize` (vector2d): Specifies the width and height of rows in the list.
- `itemSpacing` (vector2d): Specifies the spacing between rows in the list.
- `numRows` (integer): Specifies the number of visible rows in the list.
- `rowHeights` (array of floats): Specifies the heights of each row of the list.
- `rowSpacings` (array of floats): Specifies the spacing after each row of the list.
- `rowItemSize` (array of vector2d): Specifies the width and height of the items in each row.
- `rowItemSpacing` (array of vector2d): Specifies the spacing between items in each row.
- `focusXOffset` (array of floats): Specifies the x-dimension offset of the first fully visible item in each row relative to the left edge of the list.
- `rowLabelOffset` (array of vector2d): Specifies the offset of the row label for each row.
- `showRowLabel` (array of Boolean): Specifies whether the row label on the left edge of each row is displayed.
- `showRowCounter` (array of Boolean): Specifies whether the "item_number of total_number_of_items" label on the right edge of each row is displayed.
- `indefiniteRowItemCount` (array of Boolean): Specifies whether a "+" character should be appended to the "total_number_of_items" label in the UI.
- `variableWidthItems` (array of Boolean): Specifies whether items in a row have variable widths.

### Scrolling and Focus Management

- `rowFocusAnimationStyle` (option string): Specifies how the focus indicator moves in a row of items in response to remote direction pad Left and Right key presses.
- `vertFocusAnimationStyle` (option string): Specifies how the focus indicator moves in a list or a column of grid items in response to remote direction pad Up and Down key presses.
- `drawFocusFeedbackOnTop` (Boolean): Specifies whether the focus indicator bitmap is drawn below or on top of the list items.
- `drawFocusFeedback` (Boolean): Specifies whether or not the focus indicator bitmap is displayed.
- `animateToItem` (integer): When set to a valid item index, causes the list to quickly scroll so that the specified row moves into the focus position.

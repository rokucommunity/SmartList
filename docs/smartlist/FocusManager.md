# Focus Manager

Responsible for managing the focus behavior within the list.

Responsabilities include:

- Handling Focus Navigation: The focus manager determines how focus moves between different UI elements when users interact with the remote control. It manages the focus chain and ensures that the correct element receives focus based on user input.
- Focus Highlighting: It controls the visual indication of focus, such as highlighting the focused UI element to provide feedback to the user about which element is currently selected.
- Focus Movement Constraints: The focus manager may enforce rules or constraints on focus movement, such as preventing focus from moving to certain elements under specific conditions or implementing custom navigation behavior.
- Event Handling: It handles focus-related events, such as onFocus and onBlur events, and triggers actions or updates UI elements accordingly.
  Accessibility: The focus manager plays a crucial role in ensuring accessibility by making it easy for users to navigate through the UI using only the remote control. It should adhere to accessibility standards and guidelines to support users with disabilities.

### Fields

- `rowFocusAnimationStyle`(string | floatingFocus | fixedFocusWrap | fixedFocus): Specifies the how the focus indicator moves in a row of items in response to the remote direction pad Left and Right key presses
- `vertFocusAnimationStyle`(string | floatingFocus | fixedFocusWrap | fixedFocus) Specifies the how the focus indicator moves in a list or a column of grid items in response to the remote direction pad Up and Down key presses
- `currFocusFeedbackOpacity`(float) - This field provides access to the current opacity of the focus feedback indicator. It can be used to have other items on the screen fade in/out when the focus feedback indicator fades in/out.
- `fadeFocusFeedbackWhenAutoScrolling`(boolean) - When set to true, the focus feedback indicator will quickly fade out when scrolling multiple items and fade back in when the scrolling ends. The focus feedback indicator will also after in and out when using the FFW/Rewind keys to scroll a page at a time.
- `drawFocusFeedbackOnTop`(boolean) - Specifies whether the focus indicator bitmap is drawn below or on top of the list items.
- `drawFocusFeedback`(boolean) - Specifies whether or not the focus indicator bitmap is displayed. -`imageWellBitmapUri`(string) - Specifies the bitmap file to use to suggest where images would appear for empty lists.
- `focusBitmapUri`(string) - Specifies the bitmap file used for the focus indicator when the list has focus. In most cases, this should be a 9-patch image that specifies both expandable regions as well as margins. Only set this field to specify a custom bitmap that differs in appearance from the default bitmap.
- `focusFootprintBitmapUri`(string) - CopyEditSpecifies the bitmap file used for the focus indicator when the list does not have focus. In most cases, this should be a 9-patch image that specifies both expandable regions as well as margins. Only set this field to specify a custom bitmap that differs in appearance from the default bitmap.
- `loadingBitmapUri`(string) - Specifies a bitmap file to display while a list item poster is loading.
  To execute a seamless cross-fade transition between posters, set the loadingBitmapUri of the next poster to be shown to the uri of the currently displayed poster.
- `loadingBitmapOpacity`(float) - Specifies an opacity value used to render the loading bitmap.
- `failedBitmapUri`(string) - Specifies a bitmap file to display when a list item poster fails to load.
- `failedBitmapOpacity`(float) - Specifies an opacity value used to render the failed bitmap.
- `wrapDividerBitmapUri`(string) - Specifies the bitmap file to use as a visual separator between the last and first list items when the list wraps. In most case, this should be a 9-patch image that specifies both expandable regions. Only set this field to specify a custom bitmap that differs in appearance from the default bitmap. -`wrapDividerHeight`(float) - Specifies the height of the divider. The wrap divider bitmap will be scaled to this height. The width of the wrap divider is set to the width of the list items (that is, the x-dimension value of the itemSize field).

### Methods:

1. **moveFocus(direction as String)**

   - Parameters:
     - `direction` (String): The direction in which to move focus (e.g., "up", "down", "left", "right").
   - Description: Moves the focus to the next focusable item in the specified direction.

2. **setFocus(rowIndex as Integer, itemIndex as Integer)**

   - Parameters:
     - `rowIndex` (Integer): The index of the row containing the item to be focused.
     - `itemIndex` (Integer): The index of the item within the row to be focused.
   - Description: Sets focus on the specified item.

3. **handleFocusEvent(event as Object)**

   - Parameters:
     - `event` (Object): The focus-related event object.
   - Description: Handles focus-related events triggered by user interactions or UI changes.

4. **clearFocus()**

   - Description: Clears the focus from any currently focused item.

5. **handleKeyPress(keyCode as Integer)**
   - Parameters:
     - `keyCode` (Integer): The code of the pressed key.
   - Description: Handles key presses within the list and updates the focus accordingly.

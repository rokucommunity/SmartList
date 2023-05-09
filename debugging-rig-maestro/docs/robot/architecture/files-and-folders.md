# Files and Folders


## Folder and file naming

 - All folders are in _kebab-case_
 - All filenames are _PascalCase_
 - All extensions are in lowercase
 - Unit tests are named `thing.spec.bs`, and stored alongside the file they are testing (the build scripts filter out these files are per the build config)
 - Images are stored with 3 copies of each, with one of the following suffixes:
   - `-fhd` - full size asset at 1920x1080
   - `-hd` - _fhd_ asset at 0.666 scale
   - `-sd` - _fhd_ asset at 0.325 scale

E.g.

 - `src/components/controls/data-visualization/GenericTable.xml`
 - `src/source/controls/data-visualization/GenericTableVM.bs`


### Folder structure

Like all roku apps, code is split between `components` and `source` folders. It is preferable for code to reside in the source folder, under namespaces and classes. This is because code in the `source` runs in the main thread in unit testing scenarios, which allows us to develop and test rapidly, using TDD, taking full advantage of rooibos' and maestro framework's rapid development features.

#### src folders
The src folder contains all of the channel assets (code, images, etc), which are transpiled and packaged to produce the build artifacts.

#### Layered src folders
In addition, we have source folder _overrides_ which facilitate _file layering_ so that we can make build for specific environments.

Notably, the `src-prod` folder, contains it's own `AppConfig.json`, which is layered over the default, to provide environment specific content.


#### src folder contents
The following table describes the main folders found in `src`. Each one of these may have none or more sub-folders.

| Path | Description |
|---|---|
|sounds|Any sound files used by the channel|
|images|Any image files used by the channel|
|meta|Any metadata files (such as graphql/.xml/.txt files)
|components|_Roku components folder_: All xml files below this folder are presumed to be components, and all other files are only visible to the application when imported into an xml component|
|components/controls|Controls such as buttons, labels, custom containers. Controls are generally MVC style components (i.e. they do not have ViewModels). Note, in most cases, a control is better suited to being a `NodeClass`, residing in the `source/controls` folder|
|components/cells|Cells for displaying _cards/tiles_. In many cases, it is preferable to use `NodeClass` cells, in the source folder, particularly for highly dynamic cells. _Never use MVVM style coding and bindings for cells_. |
|components/roku_modules|Location of ropm dependencies. Similar to node_modules folder in node development. This folder is managed by the ropm.
|components/screens|XML files for screens. All screens should be a single xml file, and all view logic should be contained in a corresponding VM |
|source| _Roku source folder_: Any kind of file can be stored in this folder, and all of them are contained in the _main_ scope. These files are only visible to xml components by importing them. Namespaces and/or classes must be used to avoid function naming collisions|
|source/controls|Controls such as buttons, labels, custom containers. These will be `NodeClass` files|
|source/cells|Cells for displaying _cards/tiles_. These will be `NodeClass` files. _Never use MVVM style coding and bindings for cells_. |
|source/lib|Shared library code|
|source/roku_modules|Location of ropm dependencies. Similar to node_modules folder in node development. This folder is managed by the ropm.
|source/screens|Predominately this folder will contain ViewModel files, used by the correspondingly named xml file in the `components` folder. e.g. `components/screens/LoginScreen.xml` will have a corresponding `source/screens/LoginScreenVM.bs` file). Some screens may also be `NodeClass`, MVC style classes, where appropriate |
|source/tests|Recall that `.spec.bs` files are stored alongside their implementation counterparts: This folder is not intended for storing spec files; but utilities and other files that pertain to testing. In all cases, they should be named with `.spec.xxx` e.g. `source/tests/TestUtils.spec.bs`|


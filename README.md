# SmartList
A powerful RowList alternative for Roku's SceneGraph

[![build status](https://img.shields.io/github/actions/workflow/status/rokucommunity/SmartList/build.yml?branch=master&logo=github)](https://github.com/rokucommunity/SmartList/actions?query=branch%3Amaster+workflow%3Abuild)
[![coverage status](https://img.shields.io/coveralls/github/rokucommunity/SmartList?logo=coveralls)](https://coveralls.io/github/rokucommunity/SmartList?branch=master)
[![monthly downloads](https://img.shields.io/npm/dm/SmartList.svg?sanitize=true&logo=npm&logoColor=)](https://npmcharts.com/compare/SmartList?minimal=true)
[![npm version](https://img.shields.io/npm/v/SmartList.svg?logo=npm)](https://www.npmjs.com/package/SmartList)
[![license](https://img.shields.io/npm/l/SmartList.svg)](LICENSE)
[![Slack](https://img.shields.io/badge/Slack-RokuCommunity-4A154B?logo=slack)](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)


NOTE: this is a work in progress. Nothing has been published, and the design is not yet finalized. i.e. you can't actually use it yet. Coming soon!

## Installation
### ropm
The preferred way to install the list is through the [ropm package manager for roku](https://github.com/rokucommunity/ropm)

```bash
ropm install roku-smart-label
```

### Manual install
1. Download the latest release from [releases](https://github.com/rokucommunity/SmartList/releases) and extract the zip.
2. Copy the files into your `pkg:/components` folder. The package contents should look something like this:

    ```graphql
    ./YourApp
    ├─ components/
    | ├─ SmartList/
    | | ├─ SmartList.brs
    | | ├─ SmartList.xml
    │ | └─ ...other smart list files
    │ └─ MainScene.xml
    ├─ source/
    │ └─ main.brs
    └─ manifest
    ```

## Usage
### Initialization
Declare the component in your xml like this. Be sure to give it an ID so we can find it later in brightscript.
```xml
<component name="HomePage">
    <children>
        <SmartList id="homeList">
    </children>
    <script uri="HomePage.brs">
</component>
```

Now we need to populate the list with some data:

`HomePage.brs`
```vb
sub init()
    m.homeList = m.top.findNode("homeList")
    
    rowCount = 10
    cellCount = 10

    content = createObject("roSGNode", "ContentNode")
    for r = 0 to rowCount
        rowContent = listContent.createChild("ContentNode")
        for c = 0 to cellCount
        cellContent = rowContent.createChild("ContentNode")
        cellContent.update({
            color: "0xFFFFFF"
            'make each cell slightly larger, to show how awesome this list is
            width: 10  * r
            height: 10 * c
        })
        end for
    end for
    'assign the content of the list, this will render the list
    m.homeList.content = content
end sub
```
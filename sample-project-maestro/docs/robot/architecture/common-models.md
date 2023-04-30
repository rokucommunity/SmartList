# Common Models

## Base Models

All Models extend `BaseModel.bs`, which is a lazy instanatiated model that contains a `json` property.

## Performance considerations

For models that are numerous (such as video items, or other collections that come from the server), try to keep fields as few as possible, as that causes more overhead on the device.

It is better to have wrapper methods that get items out of json (e.g. `getItemSubtitle`), or do so in view code, than to parse fields in the service layer, as that work must be done for _all_ models, whereas a roku screen can only display a few items at a time, and it is possible that a viewer will only ever see a handful of items, so waisting cycles on json transforms and unnecessary eager field creation/setting is discouraged.

## Serializing models to registry

If you need to write a model/class to the registry, simply:

- implement `serialize() as data as mc.types.assocarray` and return a json blob of data to store
- implement `deserialize(data as mc.types.assocarray)`, and set the json blob to your desired class/node
- invoke the `readSerializable(section, key, serializable as object)` and `writeSerializable(section, key, serializable as object)` methods, as required on an `mc.Registry` instance

## Types of models

In roku development there are multiple structures to describe objects, similar to other languages (e.g. c# and objective c hav structs and classes, typescript has classes and interfaces, etc ).

Broadly, we have the following types:

- NodeClass (these are "roSGNode", components, which we create with the `@node` directive)
- classes - brighterscript classes
- interfaces - which are similar to typescript interfaces

The latter is to be released imminently in the brighterscript compiler. At time of writing we use classes in their place.

### Selecting the correct type for your model/class

| Is long lived? | Is only used in one node/task? | Is passed between different nodes? | Has functions? | Use       |
| -------------- | ------------------------------ | ---------------------------------- | -------------- | --------- |
| X              | -                              | X                                  | X              | NodeClass |
| X              | -                              | X                                  | -              | NodeClass |
| X              | X                              | -                                  | X              | Class     |
| -              | -                              | -                                  | X              | Class     |
| X              | -                              | X                                  | -              | Interface |
| -              | -                              | X                                  | -              | Interface |

Note, their are some nuances in deciding when to opt for an interface vs a NodeClass, which will depend on performance and observer-chaining issues, and the complexity of the structure being passed around. When it is not clear; best to jump on a face-to-face with one of the team and rubber-duck it out.

## Common models/managers

| Model              | Description                                   |
| ------------------ | --------------------------------------------- |
| appConfig          | application config from local build           |
| robot              | robot json                                    |
| sharedDate\*       | a date object that can be used by the channel |
| manifest           | manifest info for the channel                 |
| authorizationInfo  | info about authorization                      |
| authenticationInfo | info about authentication                     |
| rokuStore          | info about rokuStore                          |
| user               | contains info pertinent to the user           |
| delayedTaskManager | maestro manager for delayed tasks             |
| debugFlags         | overrides for app config and other json       |
| styleManager\*     | maestro style manager                         |

* denotes a model that is available on global as well, as an optimization
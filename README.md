# quick-type

[Views on VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=kashish.quick-type)

Provides miscellaneous tools to help you create strings, arrays, and maps!

To use, open the Command Palette (Cmd+Shift+P) and find the feature you would like to use and search for the appropriate category it falls in. The functions will apply to highlighted text, if there

If you have any suggestions, please open an issue in the Github repository

## Features

`Strings`
- Surround individual words with quotation marks ', ", or `

`Data structures`
- Quickly convert rows of whitespace separated key-value pairs to a map
    - Current language support: JavaScript, Python, Ruby, C++, Java
- Quickly convert whitespace separated values to an array
    - Current language support: JavaScript, Python, Ruby, C++, Java, OCaml

![GIF showing features](https://s3.gifyu.com/images/quick-type-0.1.0.gif)

## Extension Settings

* `quick-type.stringRegex`: Defines the regex for a single word for string functions
* `quick-type.valueRegex`: Defines the regex for a single value for data structure functions
* `quick-type.readUntilEnd`: Read values until EOF or whitespace line when there is no highlighted text. If false, only read one line

## Known Issues

None-- if you find one, please open an issue in the Github repository :)

## Release Notes

### 0.1.0

- Users no longer have to highlight text
    - Values will be read in util EOF or a whitespace line is found

### 0.0.4

- Bug fixes

### 0.0.3

- Support for different types of maps
- Added option to choose from different languages when user is not using a supported language

### 0.0.1

- Initial release

**Enjoy!**

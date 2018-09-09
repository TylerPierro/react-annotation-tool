# react-annotation-tool
A react based video & image annotating tool


 [![NPM Version](https://img.shields.io/npm/v/react-annotation-tool.svg?branch=master)](https://www.npmjs.com/package/react-annotation-tool) 

## Quick start

Installation
```
npm i react-annotation-tool --save
```

Usage
```
import {ImageTool} from "react-annotation-tool"
```

## Image Annotation



#### Config Props

| Prop             | Description   | Format | Default |
| -------------    | ------------- | ------------- | -------------| 
| url              | Source of annotated image |String||
| annotationWidth  | Set the width of image|Number||
| dynamicOptions       | Enable annotators to add/delete menu options |Boolean|false|
| disabledOptionLevels | The levels which can't be selected. Start from "1". e.g., [1, 2] means level 1, 2 can't be selected|[String]||
| category  | Category of the image |String|
| categoryOptions  |  Options for categories | [String]||
| menu | A set of options for tagging the image |Object||
| annotations | Default annotations |[Object]||


#### Callback props

| Prop           | Description   |
| -------------  | ------------- | 
| onNextClick    | Called when Next button is Clicked |  
| onPreviousClick| Called when Previous button is Clicked|        
| onSkipClick    | Called when Skip button is Clicked|        


#### Output


| Prop           | Description | Default |
| ------------- | ------------- | ------------- |
| Content Cell  | Content Cell  | |
| Content Cell  | Content Cell  | | 


## Video Annotation

coming soone in Dec 2018



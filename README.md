# react-annotation-tool
A react based video & image annotating tool. See [demo](https://chi-lin.com/projects/react-annotation-tool).

 [![NPM Version](https://img.shields.io/npm/v/react-annotation-tool.svg?branch=master)](https://www.npmjs.com/package/react-annotation-tool) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

### Installation

Use npm to install the tool into your react project. 
```
npm i react-annotation-tool --save
```

### Usage
Two tools are available now. They are [Image Annotation Tool](#Image-Annotation-Tool) (aka TwoDimensionalImage) and [Video Annotation Tool](#Video-Annotation-Tool) (aka TwoDimensionalVideo) respectively. Import either one into your react component. 
```js
import {TwoDimensionalImage, TwoDimensionalVideo} from "react-annotation-tool"
```

## Image Annotation Tool
This tool allows to annotate images with polygons. Users could create new taxonomy if they feel the annotation does not fit into any default options. It is adopted by a CVPR 2019 paper, [VizWiz-Priv: A Dataset for Recognizing the Presence and Purpose of Private Visual Information in Images Taken by Blind People](https://www.cs.cmu.edu/~jbigham/pubs/pdfs/2019/vizwiz-priv.pdf). 

### Data Formats
| Name          | Description   |
| ------------- | ------------- |
| Annotation    |The basic unit of the annotation result|
| Vertices      |Each annotation contains mutiple vertices.|

### Props

| Prop             | Description   | Format | Default |
| -------------    | ------------- | ------------- | -------------| 
| `className`      |               |String         |`''`          |
| `url`            | Image url     |String         |`''`          |
| `imageWidth`     | Image width   |Number         |`400`         |
| `defaultAnnotations` | Default annotations. [Detail](#defaultAnnotations)|[Object]|`[]`|
| `options`            | A set of options for classifying annotations. [Detail](#options)|Object|`{}`|
| `isDynamicOptionsEnable` | Enable users to add/delete options |Boolean|`false`|
| `disabledOptionLevels`   | The levels which can't be selected. Start from "1". [Detail](#disabledOptionLevels)|[String]|`[]`|
| `isLabelOn`        | Show labels of annotaions on the image |Boolean|`false`|
| `isViewOnlyMode`   | View only                              |Boolean|`false`|
| `emptyAnnotationReminderText`| Text for warming empty annotaion on the control panel |String|`''`|
| `hasPreviousButton`| Enable Previous button                 |Boolean|`false`|
| `onPreviousClick`  | Called when Previous button is clicked|Function|`()=>{}`| 
| `hasNextButton`  | Enable Next button  |Boolean|`false`|
| `onNextClick`    | Called when Next button is clicked |Function|`()=>{}`|
| `hasSkipButton`  | Enable Skip button |Boolean|`false`|`()=>{}`|    
| `onSkipClick`    | Called when Skip button is clicked|Function|`()=>{}`|       

#### `defaultAnnotations`
```js
[{id: "jlhbb0cr", name: "jlhbb0cr", color: "rgba(227,0,255,1)", vertices:
    [{id: "jlhbb0cr", name: "jlhbb0cr", x: 228.8125, y: 126}, 
     {id: "jlhbb0ng", name: "jlhbb0ng", x: 254.5, y: 131}, 
     {id: "jlhbb0uh", name: "jlhbb0uh", x: 269.5, y: 145}, 
     {id: "jlhbb11f", name: "jlhbb11f", x: 280.5, y: 173},
     {id: "jlhbb17w", name: "jlhbb17w", x: 286.5, y: 215}, 
     {id: "jlhbb1dw", name: "jlhbb1dw", x: 287.5, y: 249},
     {id: "jlhbb360", name: "jlhbb360", x: 220.5, y: 141}],
  selected: [{id: "0", value: "root"}, {id: "1", value: "Electronic"}, {id: "1-1", value: "Laptop"}]},
 {id: "jlhbb6tx", name: "jlhbb6tx", color: "rgba(255,219,0,1)", vertices:    
    [{id: "jlhbb6tx", name: "jlhbb6tx", x: 103.5, y: 345}, 
     {id: "jlhbb7hm", name: "jlhbb7hm", x: 354.5, y: 306},   
     {id: "jlhbb80e", name: "jlhbb80e", x: 385.5, y: 452}, 
     {id: "jlhbb8st", name: "jlhbb8st", x: 116.5, y: 479}],
  selected: [{id: "2", value: "Stationery"}, {id: "2-1", value: "Pen"}]}
]
```

#### `options`
Nested array of object. Each object has `id`, `value` and `children` properties. Must start from object with `value`: "root". e.g,
```js
{id: "0", value: "root", children: [
   {id: "1", value: "Electronic", children: [
      {id: "1-1", value: "Laptop", children: [
         {id: "1-1-1", value: "Apple", children: []},         
         {id: "1-1-2", value: "Asus", children: []}  
      ]}, 
      {id: "1-2", value: "Charger", children: []},
      {id: "1-3", value: "Watch", children: []}
   ]},
   {id: "2", value: "Stationery", children: [
      {id: "2-1", value: "Pen", children: []},
      {id: "2-2", value: "Eraser", children: []}
   ]}
]}
```

#### `disabledOptionLevels`
Array of Integer. Start from "1". e.g,
```js
[1, 2]
```

### TODO
- [x] Refactorize all components.

## Video Annotation Tool
Vidoe tool allows you to annotate object in videos via bounding box. The tool originally is designed for annotating cell videos. 

### Data Formats
| Name          | Description   |
| ------------- | ------------- |
|Annotation     |The basic unit of the annotation result|
|Incident       |Each annotation contains mutiple incidents. Each incident records the time and some information (e.g., position, size, status...) when the annotation is manipulate by the users (e.g., split, move, resize...)|
|Parent(parentName)|If you enable Split functionality, this property stores the parent who generates current annotation|
|Children(childrenNames)|If you enable Split functionality, this property store the children belong to current annotation|

### Props

| Prop             | Description   | Data Type | Default |
| -------------    | ------------- | ------------- | -------------| 
| `className`      |               |String         |`''`|
| `url`            | Video url     |String         |`''`|
| `defaultAnnotations`  | Default annotations. [Detail](#defaultAnnotations)|[Objects]|`[]`|
| `videoWidth`          | Video width |Number|`400`|
| `isDefaultAnnotationsManipulatable` |Allow users to edit default annotations|Boolean|`false`|
| `previewHeader`                     | Header for preview |String|`''`|
| `previewNoticeList`                 | Content for preview | [String]|`[]`|
| `isEmptyCheckEnable`                | Force users to annotate at least one object|Boolean|`false`|
| `isSplitEnable`                     | Enable Split button for each annotation |Boolean|`false`|,
| `isShowHideEnable`                  | Enable Show/Hide button for each annotation |Boolean|`false`|,
| `hasReview`                         | Enable review after users click submit button |Boolean|`false`|
| `numAnnotationsToBeAdded`           | Number of annotations users can be added |Number|`1000`|
| `onSubmit`                          | The callback function to handle submitted result |Function|`()=>{}`|
| `emptyCheckSubmissionWarningText`   | Text for warming empty annotaion |String|`''`|
| `emptyCheckAnnotationItemWarningText`  | Text for warming non-incident anntation |String|`''`|
| `emptyAnnotationReminderText`          | Text for warming empty annotaion on the control panel |String|`''`|


#### `defaultAnnotations`
```js
[{
  id: "jwzlwirv",
  name: "jwzlwirv",
  label: "1",
  color: "rgba(255,219,0,1)",
  parentName: "",
  childrenNames: ["jwzlwrh3","jwzlwrh4"],
  incidents:[
   {x:198.25, y:137, width:101, height:99, time:0, status:"Show", id:"jwzlwirv", name:"jwzlwirv", label:""},   
   {x:235.25, y:190, width:73, height:68, time:0.07694, status:"Show", id:"jwzlwlzl", name:"jwzlwlzl", label:""},
   {x:235.25, y:190, width:73, height:68, time:0.11864, status:"Split", id:"jwzlwrh2", name:"jwzlwrh2", label:""}
  ]
 },
 {
   id: "jwzlwrh3",
   name: "jwzlwrh3",
   label: "1-1",
   color: "rgba(0,255,81,1)",
   parentName: "jwzlwirv",
   childrenNames: [],
   incidents: [
    {x:235.25, y:190, width:36.5, height:34, time:0.11864, status:"Show", id:"jwzlwrh2", name:"jwzlwrh2", label:""}, 
    {x:202.25, y:267, width:64.5, height:83, time:0.17467, status:"Show", id:"jwzlwy9h", name:"jwzlwy9h", label:""}
   ]
 },
 { 
   id: "jwzlwrh4",
   name: "jwzlwrh4",
   label: "1-2",
   color: "rgba(0,255,81,1)",
   parentName: "jwzlwirv",
   childrenNames: [],
   incidents: [
    {x:251.75, y:204, width:36.5, height:34, time:0.11864, status:"Show", id:"jwzlwrh2", name:"jwzlwrh2", label:""}, 
    {x:298.75, y:242, width:51.5, height:54, time:0.17467, status:"Show", id:"jwzlwwpj", name:"jwzlwwpj", label:""}
   ]
 }
]
```

### TODO
- [x] Makes Split and Hide optional.
- [ ] Enable other shapes (e.g., circle) to annotate.

### Want to talk with me?
I am seeking for any sort of entrepreneurship and crowsourcing research opportunity. Please [contact me](https://www.linkedin.com/in/chi-benny-lin-508b841a/).

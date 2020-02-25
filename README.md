# generate-image-viewer-page

Script to geneate html file to for each image view.

### Prerequisite

Install `node js`

### How to start

1. Run

```
node generate.js
```

2. The script will generate folder structure as below.

```
.
├── generate.js     --> The script to control the whole process
├── info            --> Root folder of generate html pages
│   ├── images      --> The image folder for each page
│   └── index.html  --> The summar of all html page that will have been generated
└── temp-images     --> Temporary folder to store images that want to generate a page. All the image here will remove to `/info/iamges`
```
3. Add images to `temp-images` folder then run `node genaerate.js` again. The script will generate html file base on the images insdie the `temp-images` folder.

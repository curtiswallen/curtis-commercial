import fs from 'fs-extra';
import slugify from 'slugify';
import sanityClient from '@sanity/client';
import toMarkdown from '@sanity/block-content-to-markdown'

const client = sanityClient({
  projectId: 'rjnzi28z',
  dataset: 'production',
  apiVersion: '2023-01-04', 
  token: 'skIZkeyBWVZahVDoh1g0vpIMNNlbXbdAZQfkJXfSf4u0DsJqW30yHBP5wTk0y3OPWCPCbL4977Qf5DhzWPhNgp9ZtAbjRXtYRCjxFDGb9TCYlRPSp8h1IrF2ZT4K2Q4jhbJcTzcyhrQEq37SHsktc6DotYSvfCV51U0KublgerY1Y6XWb4MO', 
  useCdn: false
})

/* CLEAR PREVIOUS CONTENT */

fs.rm('content/', { recursive: true }, err => {
  if (err) {
    throw err
  }
})

/* HOMEPAGE EXPORT */

client.fetch(`*[_type == "homepage"]{ 
  defined(images) => {images[]{
      defined(asset) => {asset->{
        defined(url)=>{url},
        defined(altText)=>{altText},
        defined(description)=>{description},
        defined(title)=>{title},
        defined(opt.media.tags)=>{"tags": opt.media.tags[]->name.current}
      }
    }}
  }
}`)
.then((res) => 
  res.map(async (entry) => {

    let dir = 'content/';

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }

    let homepage = {}
    homepage.images = entry.images;

    let JSONhomepage = JSON.stringify(homepage);
      fs.writeFile(dir+"homepage.md", JSONhomepage, (err) => {
      if (err) {
          throw err;
      }
        console.log("Homepage is saved.");
    }); 
  })
)
.catch(console.error)

/* PHOTO COLLECTION EXPORT */

client.fetch(`*[_type == "photoCollection"]{ 
  shortTitle,
  defined(longTitle) => {longTitle},
  collectionDate,
  shortDescription,
  defined(longDescription) => {longDescription},
  defined(links) => {links[]},
  defined(images) => {images[]{
      defined(asset) => {asset->{
        defined(url)=>{url},
        defined(altText)=>{altText},
        defined(description)=>{description},
        defined(title)=>{title},
        defined(opt.media.tags)=>{"tags": opt.media.tags[]->name.current},
        defined(metadata)=>{metadata}
      }
    }}
  }
}`)
.then((res) => 
  res.map(async (entry) => {
    const cleanShortDescription = toMarkdown(entry.shortDescription);
    const cleanLongDescription = toMarkdown(entry.longDescription);
    const slug = slugify(entry.shortTitle).toLowerCase();

    let dir = 'content/'+slug;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }

    let photoCollection = {}
    photoCollection.collection = true;
    photoCollection.shortTitle = entry.shortTitle;
    photoCollection.longTitle = entry.longTitle;
    photoCollection.collectionDate = entry.collectionDate;
    photoCollection.shortDescription = cleanShortDescription;
    photoCollection.longDescription = cleanLongDescription;
    photoCollection.links = entry.links
    photoCollection.images = entry.images

    let JSONcollection = JSON.stringify(photoCollection);
      fs.writeFile(dir+"/"+"index.md", JSONcollection, (err) => {
      if (err) {
          throw err;
      }
        console.log(entry.shortTitle+" is saved.");
    }); 
  })
)
.catch(console.error)

/* INFO EXPORT */

client.fetch(`*[_type == "info"]{ 
  shortTitle,
  defined(longTitle) => {longTitle},
  description,
  defined(links) => {links[]}
}`)
.then((res) => 
  res.map(async (entry) => {
    const cleanDescription = toMarkdown(entry.description);
    const slug = slugify(entry.shortTitle).toLowerCase();

    let dir = 'content/';

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }

    let info = {}
    info.info = true;
    info.shortTitle = entry.shortTitle;
    info.longTitle = entry.longTitle;
    info.description = cleanDescription;
    info.links = entry.links

    let JSONinfo = JSON.stringify(info);
      fs.writeFile(dir+"info.md", JSONinfo, (err) => {
      if (err) {
          throw err;
      }
        console.log(entry.shortTitle+" is saved.");
    }); 
  })
)
.catch(console.error)
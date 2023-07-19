import fs from 'fs-extra';
import slugify from 'slugify';
import sanityClient from '@sanity/client';
import toMarkdown from '@sanity/block-content-to-markdown'

const client = sanityClient({
  projectId: 'rjnzi28z',
  dataset: 'production',
  apiVersion: '2023-01-04', 
  token: 'skTtfgU2HSnzGXEK3NunTSKIUINfrgdNFiSOnEf8coGT4bvkpyfBasQ41WKvJkafpEFhtonJmLueRXCxb', 
  useCdn: false
})

/* CLEAR PREVIOUS CONTENT */

fs.rm('content/', { recursive: true }, err => {
  if (err) {
    throw err
  }
})

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
        defined(opt.media.tags)=>{"tags": opt.media.tags[]->name.current}
      }
    }}
  }
}`)
.then((res) => 
  res.map(async (entry) => {
    const cleanShortDescription = toMarkdown(entry.shortDescription);
    const cleanLongDescription = toMarkdown(entry.longDescription);
    const slug = slugify(entry.shortTitle).toLowerCase();

    let dir = 'content/';

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
      fs.writeFile(dir+slug+".md", JSONcollection, (err) => {
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
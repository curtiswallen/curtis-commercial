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

/* PROJECTS EXPORT */

client.fetch(`*[_type == "homepage"]{ 
	defined(images) => {images[]{
      asset->{
        defined(url)=>{url},
        defined(altText)=>{altText},
        defined(description)=>{description},
        defined(title)=>{title},
        defined(opt.media.tags)=>{"tags": opt.media.tags[]->name.current}
      }
    }}
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
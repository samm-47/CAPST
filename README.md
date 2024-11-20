First after cloning repository 

npm install

npm run dev


## Possible installs before running backend

npm install axios


pip install flask 


pip install google-generativeai


pip install flask-cors

pip install langdetect

npm install concurrently --save-dev


## new for web hosted 

npm run dev will run somewhat differently then what is on the cloudflare 

due to static web nuances

to test similar environment must

npm install -g serve


THEN FROM HERE
To run the Build locally instead of 'npm run dev' use 'npx next build'
and then when that finishes use 'serve out'

THIS METHOD DOES NOT CHANGE SITE DYNAMICALLY WITH CODE LIKE NPM RUN DEV DOES!!


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Any images or icons to be used put in the public folder and then refer to with /icon_name.filetype
for grabbing icons for the main Font Awesome is used and works well within the client-side pages follow

the use effect hook in the Chatbot layout.tsx and also go to Fontawesome.com to find icons and call them

using i tags within the code the necessary i tag should be given through Font awesome to copy

for Server-side icons copy icon i tag from FontAwesome but change 'class' to 'classname' 




## Getting Started

*In one terminal, run the frontend development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
In a second terminal, run the backend server:

cd backend

python api.py

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

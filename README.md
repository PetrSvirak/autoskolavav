This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Current project status: [![Netlify Status](https://api.netlify.com/api/v1/badges/16037797-eff2-4073-a83e-d0330827afa4/deploy-status)](https://app.netlify.com/sites/autoskolavav/deploys) (preview: [![Netlify Status](https://api.netlify.com/api/v1/badges/b0e49999-eadc-4d41-9ca5-1a85981a3962/deploy-status)](https://app.netlify.com/sites/autoskolavav-preview/deploys))

## Getting Started

First, make sure you have your **_.env.local_** file ready. It needs

- projectId
- (optional) previewSecret
- (optional) previewApiKey

Second, run the development server:

```bash
npm run dev
```

Before commit:

- run either `check-format` or `format`.
- test your change (there are no automated tests in this repository)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Generate models

Navigate to `/deliveryClient/models/` and run:

```bash
#<prerequisite># npm i @kentico/kontent-model-generator -g
kontent-generate --projectId=<rojectId> --moduleResolution=ES2015 --codeType=TypeScript
```

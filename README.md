This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, make sure you have your **_.env.local_** file ready. It needs

- projectId
- (optional) previewSecret
- (optional) previewApiKey

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Before commit:

- run either `check-format` or `format`.
- test your change (there are no automated tests in this repository)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Generate models

Navigate to `/models` and run:

```bash
kontent-generate --projectId=93665d46-fba8-0130-141c-dbb905222ba6 --moduleResolution=ES2015 --codeType=TypeScript
```

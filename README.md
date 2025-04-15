# Welcome to your CDK TypeScript App which host the nextjs app build files to Amazona s3

## Your project should look like this:
`
cdk-nextjs-app/
├── shiv-portfolio/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx
│   ├── public/
│   ├── out/ (generated after build)
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
├── nextjs-portfolio-on-s3/
│   ├── lib/
│   │   └── shiv-portfolio-cdk-stack.ts.ts
│   ├── bin/
│   │   └── cdk-infra.ts
│   ├── package.json
│   ├── tsconfig.json
`
- first you need to configure your aws account, run the following cmd : `aws configure` and follow the instruction.
- create a root folder named (cdk-nextjs-app) -> `mkdir cdk-nextjs-app` and `cd cdk-nextjs-app`
- create next js app using `npx create-next-app@latest portfolio-app` and  follow the instruction and `cd portfolio-app`
- design your website and run the following cmd to make build folder `npm run build` that will export all your build files to 'out' folder
- comeback to root folder ` cd ../cdk-nextjs-app` and 
- `git clone https://github.com/1983shiv/nextjs-portfolio-on-s3.git` and `cd nextjs-portfolio-on-s3`
- `npm run install` to install all the depencies
- now go to the lib\shiv-portfolio-cdk-stack.ts on line no : 25 and 
- change `sources: [s3deploy.Source.asset(path.join(__dirname, '../../shiv-portfolio/out'))],`to ` sources: [s3deploy.Source.asset(path.join(__dirname, '../../nextjs-portfolio-on-s3/out'))],`
- `npm run deploy` to deploy the app on your aws account.

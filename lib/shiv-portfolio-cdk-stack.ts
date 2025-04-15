import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';
// import path = require('path');

export class ShivPortfolioCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket for website hosting
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html', // Fallback for SPA routing
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS, // Allow public read
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Delete bucket on stack deletion
      autoDeleteObjects: true, // Auto-delete objects on bucket deletion
    });

    
    // Deploy Next.js build files to S3
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../shiv-portfolio/out'))],
      destinationBucket: websiteBucket,
    });

    // Output the website URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'URL of the portfolio website',
    });
  }
}

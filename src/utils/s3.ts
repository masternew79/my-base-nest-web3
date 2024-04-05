import { BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import moment from 'moment';

export class S3Uploader {
  static getS3() {
    const s3 = new S3({
      region: process.env.AWS_REGION,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    });
    return s3;
  }

  static async uploadPublicFile(file: Express.Multer.File, folder: string) {
    try {
      const now = moment().valueOf();
      const { buffer, originalname, mimetype } = file;
      //   console.log({ buffer, originalname, mimetype });

      const s3 = S3Uploader.getS3();
      const uploadResult = await s3
        .upload({
          Bucket: `${process.env.AWS_BUCKET_NAME}/` + folder,
          Body: buffer,
          Key: `${now}${originalname}`,
          ACL: 'public-read',
        })
        .promise();

      return {
        key: uploadResult.Key,
        url: uploadResult.Location,
        mimetype: mimetype,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}

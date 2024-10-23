import { Injectable } from '@nestjs/common';

import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUpload {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = [];
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1];

    // 1. 파일을 클라우드 스토리지에 저장하는 로직
    // 1-1 스토리지 셋팅하기
    const storage = new Storage({
      projectId: 'backend-439402',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('devong-storage');

    //1-2 스토리지에 파일 올ㅣ기
    const results = [];
    console.time('time');
    for (let i = 0; i < waitedFiles.length; i++) {
      results[0] = await new Promise((resolve, reject) => {
        waitedFiles[0]
          .createReadStream()
          .pipe(storage.file(waitedFiles[0].filename).createWriteStream())
          .on('finish', () => resolve('succes'))
          .on('error', () => reject('filed'));
      });
    }
    console.timeEnd('time');
    console.log('파일 전송이 완료되어엇습니다.');
    return ['nd', 'end'];
  }
}

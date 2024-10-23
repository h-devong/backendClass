import { Injectable } from '@nestjs/common';

import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUpload {
  file: FileUpload;
}

@Injectable()
export class FilesService {
  async upload({ file }: IFilesServiceUpload): Promise<string> {
    console.log(file);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직
    // 1-1 스토리지 셋팅하기
    const storage = new Storage({
      projectId: 'backend-439402',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('devong-storage');
    await new Promise((resolve, reject) => {
      //1-2 스토리지에 파일 올ㅣ기
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          console.log('succes');
          resolve('성공');
        })
        .on('error', () => {
          console.log('filed');
          reject('실패');
        });
    });
    console.log('파일 전송이 완료되어엇습니다.');

    return 'end';
  }
}

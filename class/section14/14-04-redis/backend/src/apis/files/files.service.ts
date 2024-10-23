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

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);
    // 1. 파일을 클라우드 스토리지 저장하는 로직
    // 1-1 스토리지 셋팅하기
    const bucket = 'devong-storage';
    const storage = new Storage({
      projectId: 'backend-439402',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    //1-2 스토리지에 파일 올ㅣ기
    console.time('time');

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('filed'));
          }),
      ),
    );

    console.timeEnd('time');
    console.log('파일 전송이 완료되어엇습니다.');
    return results;
  }
}

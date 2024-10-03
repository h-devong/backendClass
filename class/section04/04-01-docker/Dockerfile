# 1. 운영체제 및 프로그램 설치 - 직접 다운로드 하는 방식

# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn


# 1. 운영체제 및 프로그램 설치 - 이미 리눅스 노드 얀 까지 모두 설치 되어있는걸 한번에 받는 방식

FROM node:14

# 2. 내 컴퓨터 안에 있는 파일을 도커 컴퓨터 안에 복사하기 
COPY ./index.js /index.js

# 3. 도커 안에서  index.js 실행시키기 
CMD node index.js
# collar_your_agents

React + Vite + TailwindCSS v4 기반 프론트엔드 프로젝트입니다.

## 실행 환경

- Node.js 20 이상
- npm 10 이상

## 처음 실행하기

1) 저장소 클론

```bash
git clone <REPOSITORY_URL>
cd collar_your_agents
```

2) 의존성 설치

```bash
npm install
```

3) 개발 서버 실행

```bash
npm run dev
```

터미널에 표시되는 로컬 주소(기본: `http://localhost:5173`)로 접속하면 됩니다.

## 주요 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드 (`dist/` 생성)
- `npm run preview`: 빌드 결과 로컬 확인
- `npm run lint`: ESLint 검사

## 배포 전 체크

```bash
npm run lint
npm run build
```

위 두 명령이 정상 통과하면 기본 배포 준비가 완료됩니다.

## 프로젝트 구조

- `src/`: 앱 소스 코드
- `public/`: 정적 파일
- `vite.config.js`: Vite 설정
- `package.json`: 스크립트 및 의존성 정의

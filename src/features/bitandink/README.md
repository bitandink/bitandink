# beanlog

> **bitandink's developer playground**

웹 개발, 인터랙션, 디자인과 작은 아이디어를 직접 만들고 실험하는 개인 개발 공간입니다.

단순히 프로젝트 결과물을 나열하는 포트폴리오보다  
제가 무엇을 만들고, 어떻게 생각하고, 어떤 방식으로 구현하는지를 보여주는 공간을 목표로 만들었습니다.

🌐 https://beanlog.site

---

## About

**beanlog**는 개발자 `bitandink`의 개인 웹사이트이자 playground입니다.

프로젝트와 작업 기록을 정적인 카드 형태로 보여주는 것에서 끝나지 않고,  
사이트 자체도 하나의 프로젝트가 될 수 있도록 인터랙션과 작은 이야기를 곳곳에 담았습니다.

현재 1차 버전에서는 다음 공간을 제공합니다.

- **Current** — 현재 진행 중이거나 주요하게 보여주고 싶은 작업
- **Archive** — 이전 작업과 기록
- **Beanlog** — 프로젝트 및 개발 기록
- **Perfugium** — 장시간 읽기를 위한 웹 읽기 환경 프로젝트
- **Playground** — 캐릭터와 개발 요소를 활용한 인터랙티브 공간

---

## Playground

Playground는 beanlog의 실험적인 인터랙션 공간입니다.

BEAN, HODU, PAMA 그리고 bitandink가 등장하며,  
화면에 떠다니는 개발 파일과 데이터를 직접 클릭해 여러 작은 인터랙션을 발견할 수 있습니다.

### `.css`

CSS와 스타일을 직접 변경해보는 작은 디자인 실험 공간입니다.

### `.env`

방문자가 익명 메시지를 작성하고 실제로 전송할 수 있는 인터랙션입니다.

Resend와 자체 도메인을 연결하여 실제 이메일 전송 기능을 구현했습니다.

### `.json`

데이터를 잡으려다 사고를 치는 HODU와 이를 수습하는 BEAN의 짧은 인터랙션입니다.

데이터 풍선을 터뜨리면 예상하지 못한 일이 일어납니다.

### `.txt`

HODU가 문장의 글자를 훔치고,  
BEAN이 이를 찾아 다시 정리하는 캐릭터 인터랙션입니다.

PAMA도 지나가며 상황을 조금 더 복잡하게 만듭니다.

### `.log`

현재 브라우저 세션에서 발생한 Playground의 행동을 기록합니다.

```text
[ACCESS] .txt opened
[WARN]   character count changed: 43 → 42
[TRACE]  missing character located near HODU
[INFO]   BEAN restored "다"
```

로그는 브라우저 세션에서만 유지되며 별도로 저장하지 않습니다.

### `.md`

Playground의 README입니다.

등장 캐릭터와 공간을 소개하며,  
읽고 있는 동안 README 자체에도 작은 변화가 발생합니다.

---

## Residents

### BEAN

> maintains the system.  
> fixes things nobody asked HODU to break.

beanlog의 관리자에 가까운 존재입니다.

코드를 작성하고 데이터를 정리하며  
HODU가 벌인 일을 주로 수습합니다.

### HODU

> professional troublemaker.

데이터를 쫓고, 글자를 훔치고,  
호기심 때문에 각종 사건을 발생시킵니다.

### PAMA

> mostly observes.  
> occasionally makes things worse.

대부분 조용히 지켜보지만  
가끔 굳이 건드리지 않아도 될 것을 건드립니다.

### bitandink

> built this place.  
> claims everything is intentional.

beanlog를 만든 사람입니다.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS Modules
- Next.js Image Optimization

### Backend / API

- Next.js Route Handlers
- Resend

### Infrastructure

- Vercel
- Gabia DNS
- Custom Domain
- HTTPS

### SEO

- Next.js Metadata API
- Open Graph
- Twitter Card
- `robots.txt`
- `sitemap.xml`
- Google Search Console

---

## Email

Playground의 `.env` 인터랙션에서는 실제 이메일 전송 기능을 사용합니다.

```text
visitor
   ↓
.env interaction
   ↓
Next.js API Route
   ↓
Resend
   ↓
beanlog.site
```

API Key와 이메일 관련 환경 변수는 서버 환경 변수로 관리하며  
클라이언트에 노출하지 않습니다.

---

## Design

beanlog는 전통적인 포트폴리오 사이트보다  
**개발자의 작업 공간을 들여다보는 느낌**을 만드는 것을 목표로 했습니다.

전체 UI는 어두운 개발 환경을 기반으로 하며,

- terminal
- filesystem
- source code
- file extensions
- logs
- environment variables

같은 개발 요소를 UI와 인터랙션의 언어로 사용합니다.

기능적인 요소와 장식적인 요소를 완전히 분리하기보다  
실제 기능 자체가 사이트의 캐릭터와 분위기를 만드는 방향으로 설계했습니다.

---

## Project Structure

```text
src/
├─ app/
│  ├─ api/
│  ├─ bitandink/
│  ├─ layout.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
│
├─ components/
└─ ...

public/
├─ bitandink/
│  ├─ characters/
│  ├─ effects/
│  └─ sounds/
│
└─ og-image.png
```

실제 구조는 개발 과정에 따라 변경될 수 있습니다.

---

## Status

```text
beanlog v1

[✓] main workspace
[✓] project navigation
[✓] responsive layout
[✓] character system
[✓] playground
[✓] .css interaction
[✓] .env interaction
[✓] .json interaction
[✓] .txt interaction
[✓] .log interaction
[✓] README interaction
[✓] custom domain
[✓] email delivery
[✓] SEO metadata
[✓] Open Graph
[✓] robots.txt
[✓] sitemap.xml

STATUS: v1 complete
```

현재 **beanlog 1차 버전 개발을 완료**했으며, 이후에는 기능을 무작정 확장하기보다 실제 사용 과정에서 필요한 부분을 개선할 예정입니다.

---

## Philosophy

```text
build.
play.
break.
fix.
repeat.
```

완성된 결과만 보여주기보다  
만들고 실험하는 과정 자체를 보여주는 공간을 지향합니다.

---

## Author

**bitandink**

Developer / Web Designer

> code, design, and unnecessary interactions.

---

© bitandink. All rights reserved.
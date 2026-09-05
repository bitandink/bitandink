# beanlog v2 Architecture

## Overview

`beanlog.site`는 역할에 따라 크게 세 영역으로 나뉜다.

-   **Main World** --- `beanlog.site`의 메인 세계
-   **Gateway** --- 현실의 bitandink 작업 공간과 Virtual World를
    연결하는 진입 공간
-   **Virtual World** --- 모니터 안에 존재하는 bitandink의 가상
    workspace

라우팅은 `src/app`, 실제 화면과 기능은 각 도메인 디렉터리가 담당한다.

------------------------------------------------------------------------

## Project Structure

``` text
src/
├─ app/
│  ├─ api/
│  │  └─ env-note/
│  │     └─ route.ts
│  ├─ bitandink/
│  │  ├─ page.tsx
│  │  ├─ home/
│  │  │  └─ page.tsx
│  │  ├─ beanlog/
│  │  │  └─ page.tsx
│  │  └─ playground/
│  │     └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
│
├─ content/
│  └─ beanlog/
│     └─ *.md
│
├─ gateway/
│  ├─ components/
│  │  ├─ BitandinkRoom.tsx
│  │  ├─ MonitorHint.tsx
│  │  └─ MonitorTransition.tsx
│  └─ styles/
│     └─ gateway.module.css
│
├─ main/
│  ├─ components/
│  │  └─ MainWorld.tsx
│  └─ styles/
│     └─ main-world.css
│
├─ shared/
│  ├─ components/
│  │  ├─ WorldShell.tsx
│  │  └─ WorldSidebar.tsx
│  └─ styles/
│     └─ world.module.css
│
├─ world/
│  ├─ home/
│  │  ├─ components/
│  │  │  └─ WorldHome.tsx
│  │  └─ styles/
│  │     └─ home.module.css
│  │
│  ├─ beanlog/
│  │  ├─ components/
│  │  │  └─ BeanlogView.tsx
│  │  ├─ lib/
│  │  │  └─ getBeanlogEntries.ts
│  │  ├─ styles/
│  │  │  └─ beanlog.module.css
│  │  └─ types.ts
│  │
│  └─ playground/
│     ├─ components/
│     │  └─ PlaygroundView.tsx
│     ├─ styles/
│     │  └─ playground.module.css
│     └─ types.ts
│
└─ config.ts
```

------------------------------------------------------------------------

## Routing

``` text
beanlog.site/
├─ /                         → Main World
├─ /bitandink                → Real World / Gateway
├─ /bitandink/home           → Virtual World / Home
├─ /bitandink/beanlog        → Virtual World / Beanlog
└─ /bitandink/playground     → Virtual World / Playground
```

External spaces:

``` text
Webzine   → https://bitandink.vercel.app
Portfolio → https://bitandink.github.io/portfolio-2026/
```

------------------------------------------------------------------------

## Main World

**Route**

``` text
/
```

**Source**

``` text
src/main/
├─ components/
│  └─ MainWorld.tsx
└─ styles/
   └─ main-world.css
```

`MainWorld`는 `beanlog.site`에 처음 접속했을 때 나타나는 메인 세계다.

주요 요소:

-   BEAN
-   PAMA
-   HODU
-   Terminal
-   System HUD
-   Resident cards
-   Resident profile
-   Floating data
-   Resident interactions

메인 세계의 화면과 인터랙션에 필요한 스타일은 `main-world.css`가
담당한다.

`src/app/globals.css`에는 사이트 전체에 적용되는 최소한의 전역 스타일만
남긴다.

------------------------------------------------------------------------

## Gateway

**Route**

``` text
/bitandink
```

**Source**

``` text
src/gateway/
├─ components/
│  ├─ BitandinkRoom.tsx
│  ├─ MonitorHint.tsx
│  └─ MonitorTransition.tsx
└─ styles/
   └─ gateway.module.css
```

Gateway는 현실의 bitandink 작업 공간을 표현한다.

어두운 방에서 bitandink가 모니터 앞에 앉아 작업하고 있으며, 사용자가
모니터 쪽으로 진입하면 화면이 확대되면서 Virtual World로 연결된다.

``` text
Real World
    ↓
Monitor
    ↓
Virtual World
```

Gateway는 Virtual World 자체가 아니라 현실 세계와 가상 workspace 사이의
경계이자 진입점이다.

------------------------------------------------------------------------

## Virtual World

Gateway의 모니터를 통해 진입하는 bitandink의 가상 workspace다.

``` text
/bitandink/home
/bitandink/beanlog
/bitandink/playground
```

각 공간은 `src/world` 아래에서 독립적으로 관리한다.

``` text
src/world/
├─ home/
├─ beanlog/
└─ playground/
```

각 영역은 자신의 component와 style을 소유한다.

------------------------------------------------------------------------

## Home

**Route**

``` text
/bitandink/home
```

Virtual World의 메인 허브다.

다른 공간으로 이동할 수 있는 진입점을 제공한다.

-   Beanlog
-   Webzine
-   Portfolio
-   Playground

Webzine과 Portfolio는 외부 프로젝트로 연결된다.

------------------------------------------------------------------------

## Beanlog

**Route**

``` text
/bitandink/beanlog
```

BEAN, PAMA, HODU의 기록을 보여주는 공간이다.

콘텐츠는 Markdown 파일로 관리한다.

``` text
src/content/beanlog/
└─ *.md
```

하나의 Markdown 파일이 하나의 log entry다.

Frontmatter는 최소한의 정보만 가진다.

``` yaml
---
resident: "hodu"
date: "2026-09-10"
mood: "suspicious"
---
```

현재 사용하는 데이터:

-   `resident`
-   `date`
-   `mood`
-   Markdown 본문

별도의 title, tag, category, description, slug 구조는 사용하지 않는다.

Markdown은 서버에서 읽어 최신 날짜순으로 정렬한다.

------------------------------------------------------------------------

## Playground

**Route**

``` text
/bitandink/playground
```

bitandink의 실험적인 인터랙션과 작은 개발 아이디어를 모아둔 공간이다.

기존 단일 컴포넌트에 포함되어 있던 Playground 기능을 별도 영역으로
분리했다.

``` text
src/world/playground/
├─ components/
│  └─ PlaygroundView.tsx
├─ styles/
│  └─ playground.module.css
└─ types.ts
```

Playground의 상태, 인터랙션, 뷰어, 실험 UI는 이 영역에서 독립적으로
관리한다.

------------------------------------------------------------------------

## Shared Workspace

Virtual World의 여러 페이지에서 공통으로 사용하는 UI는 `src/shared`에서
관리한다.

``` text
src/shared/
├─ components/
│  ├─ WorldShell.tsx
│  └─ WorldSidebar.tsx
└─ styles/
   └─ world.module.css
```

### WorldShell

Virtual World 페이지의 공통 레이아웃을 담당한다.

-   Sidebar
-   Topbar
-   Breadcrumb
-   Workspace status
-   Mobile navigation

### WorldSidebar

Virtual World의 공통 navigation을 담당한다.

``` text
SPACES
⌂ Home
◈ Beanlog
↗ Webzine
↗ Portfolio

LAB
＋ Playground
```

`Webzine`과 `Portfolio`만 외부 링크이며, 나머지는 beanlog 내부 route다.

------------------------------------------------------------------------

## CSS Ownership

v2에서는 거대한 공통 CSS 파일에 모든 스타일을 모으지 않고 각 영역이
자신의 스타일을 소유한다.

``` text
MainWorld
└─ main/styles/main-world.css

Gateway
└─ gateway/styles/gateway.module.css

WorldShell / WorldSidebar
└─ shared/styles/world.module.css

Home
└─ world/home/styles/home.module.css

Beanlog
└─ world/beanlog/styles/beanlog.module.css

Playground
└─ world/playground/styles/playground.module.css
```

`src/app/globals.css`는 전체 사이트에 필요한 최소한의 global style만
담당한다.

------------------------------------------------------------------------

## Architecture Rules

### `app/`

Next.js routing만 담당한다.

페이지 컴포넌트에서 거대한 UI나 비즈니스 로직을 직접 관리하지 않는다.

### `main/`

`beanlog.site` 루트의 Main World를 담당한다.

### `gateway/`

현실 세계와 Virtual World 사이의 진입 경험을 담당한다.

### `world/`

Virtual World 내부의 개별 공간을 담당한다.

### `content/`

Markdown 등 실제 콘텐츠 데이터를 관리한다.

### `shared/`

둘 이상의 Virtual World 영역에서 실제로 공통 사용하는 UI와 스타일을
관리한다.

공통으로 사용할 가능성이 있다는 이유만으로 미리 코드를 넣지 않는다.

------------------------------------------------------------------------

## v1 → v2

v1에서는 `BitandinkHero.tsx`와 `bitandink.module.css`에 여러 화면과
기능이 집중되어 있었다.

v2에서는 이를 역할에 따라 분리했다.

``` text
Before

BitandinkHero.tsx
├─ Gateway
├─ Workspace
├─ Current
├─ Archive
├─ Beanlog
├─ Perfugium
└─ Playground


After

Main World
├─ MainWorld

Gateway
├─ BitandinkRoom
├─ MonitorHint
└─ MonitorTransition

Virtual World
├─ Home
├─ Beanlog
└─ Playground

Shared
├─ WorldShell
└─ WorldSidebar
```

v1에서 사용하던 `Current`, `Archive`, `Perfugium` 내부 workspace는
제거되었다.

Webzine과 Portfolio는 별도의 외부 프로젝트로 연결한다.

------------------------------------------------------------------------

## Documentation Versions

기존 설계와 컨셉 문서는 삭제하지 않고 v1 기록으로 보관한다.

``` text
docs/
├─ v1/
│  ├─ concept.md
│  ├─ content-model.md
│  ├─ information-architecture.md
│  ├─ interactions.md
│  └─ world-boundary.md
│
└─ v2/
   ├─ architecture.md
   └─ refactor-notes.md
```

`v1`은 초기 설계 기록을 보존하고, `v2`는 현재 실제 구현 구조와 리팩터링
결과를 기록한다.
